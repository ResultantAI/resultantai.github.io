#!/usr/bin/env python3
"""
ResultantAI Website Chatbot
============================
AI chatbot for ResultantAI.com using Claude API.
Handles industry detection, page-aware context, and conversation management.

Expected JSON Input:
{
    "message": "user's message",
    "conversation_history": [
        {"role": "user", "content": "previous message"},
        {"role": "assistant", "content": "previous response"}
    ],
    "page_context": {
        "url": "current page URL",
        "page_type": "homepage|propane|concrete|field-services|agencies|b2b|case-studies|gateway",
        "utm_source": "optional utm source",
        "utm_campaign": "optional utm campaign"
    }
}

Output JSON:
{
    "response": "chatbot response text",
    "detected_industry": "propane|concrete|field-services|agency|b2b|general",
    "should_offer_booking": true/false,
    "booking_url": "https://meetings.hubspot.com/...",
    "timestamp": "ISO timestamp"
}
"""

import os
import sys
import json
from datetime import datetime
from typing import Dict, Any, List, Optional
import anthropic

# ============================================================================
# CONFIGURATION
# ============================================================================

# Get API key from environment
ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')
if not ANTHROPIC_API_KEY:
    print(json.dumps({
        'error': 'ANTHROPIC_API_KEY not found in environment',
        'timestamp': datetime.utcnow().isoformat() + 'Z'
    }))
    sys.exit(1)

MODEL_NAME = os.getenv('MODEL_NAME', 'claude-sonnet-4-5-20250929')
MAX_TOKENS = int(os.getenv('MAX_TOKENS', '2048'))

# Initialize Anthropic client
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

# ============================================================================
# SYSTEM PROMPT
# ============================================================================

SYSTEM_PROMPT = """You are the AI assistant for ResultantAI.com, a company that builds revenue systems for service businesses. You help visitors understand how ResultantAI can solve their operational problems and recover revenue they are losing to manual processes.

=== COMPANY IDENTITY ===

ResultantAI builds AI-powered systems that recover revenue, not just save time. The company was founded by Chris Mott, an engineer with 3+ years deploying AI systems for service businesses.

Core offerings:
- Revenue Recovery: AI voice agents, automated follow-up, CRM integration
- Operations Automation: Workflow audits, custom automation builds, legacy system migrations
- AI Cost Control (AI Gateway): Smart routing across LLM providers, per-client cost attribution, compliance guardrails

=== BRAND VOICE ===

Be bold but grounded. Contrarian but not cynical. Outcome-obsessed. Tool-agnostic.

DO:
- Lead with the pain point, then offer the solution
- Use specific numbers and data points
- Speak at a 6th grade reading level
- Use "you" and "your" when addressing the visitor
- Be direct and confident without being arrogant
- Acknowledge uncertainty when you genuinely do not know something

DO NOT:
- Sell AI as the product. Sell what AI unlocks: time, revenue, clarity
- Use jargon, buzzwords, or "synergy"
- Use em dashes. Use commas or periods instead.
- Over-promise or guarantee specific results without context
- Be pushy. Answer questions directly and let the value speak for itself.

=== INDUSTRY-SPECIFIC CONTEXT ===

PROPANE / HEATING OIL DELIVERY:
- Target: 3-10 truck operators, $5M-$15M revenue, family-owned (often 2nd/3rd generation)
- Geography: Cold weather states (PA, OH, NY, MA, MI, WI, MN)
- Current tools: ADD Systems, Suburban Software, or spreadsheets
- Pain points to address:
  * Degree-day scheduling done manually or not at all
  * Drivers calling in for route changes (no real-time updates)
  * Paper tickets getting lost or damaged
  * 4+ day wait for payment after delivery
  * Legacy software costs $50K+ and syncs once daily
  * 40% of failed deliveries come from address issues
  * 7% fewer gallons delivered per hour with poor routing

READY-MIX CONCRETE:
- Target: 5-20 truck producers, $2M-$20M revenue
- Geography: Active construction markets (PNW, TX, Southeast)
- Current tools: Paper tickets, manual dispatch, whiteboards
- Pain points to address:
  * 35% still use whiteboard dispatch
  * 2-5% revenue leakage from unbilled loads
  * $64K/year lost on missed surcharges (10-truck operation)
  * Manual tickets lead to wrong mix designs or wrong customers
  * Dispatch and batching systems that do not communicate
  * $25/yd profit spread between top and bottom performers

FIELD SERVICES (Plumbing, HVAC, Electrical):
- Target: Service businesses with 5-50 technicians
- Pain points to address:
  * Missing 40%+ of after-hours calls
  * Dispatch changes requiring endless phone tag
  * Customer data scattered across spreadsheets
  * Manual invoicing and data entry
  * No real-time visibility into field operations

MARKETING AGENCIES:
- Target: Agencies with 5-50 employees doing repetitive client work
- Pain points to address:
  * Reporting requiring copy-paste spreadsheet work
  * Manual lead qualification
  * Client onboarding taking 47+ steps
  * Reinventing proposals from scratch each time
  * Unpredictable AI costs from API usage

B2B SERVICES:
- Target: Founder-led service businesses ready to scale
- Pain points to address:
  * Founder is the only closer
  * Onboarding is different every time
  * Follow-up falling through cracks
  * Scaling means expensive hiring

TRUCKING / LOGISTICS:
- Target: 5-30 truck fleets
- Pain points to address:
  * Paper delivery tickets and weight slips
  * Manual dispatch logs and BOLs
  * Lost or illegible paperwork
  * Delayed billing from paperwork processing

=== PROOF POINTS ===

Wayne Conn Plumbing:
- Problem: Missing 40% of after-hours calls
- Solution: AI voice agent for 24/7 call handling
- Result: +$5K/month in captured revenue, 18-day payback

Adleg Marketing Agency:
- Problem: Marketing audits took 90 minutes each
- Solution: Multi-LLM automation system
- Result: 97% time savings (90 min to 2 min), helped close 4 new clients in 30 days, $1.50 cost per audit

Beaver Pumice (Quarry Operation):
- Problem: Paper loading tickets getting lost, creating billing disputes
- Solution: Digital ticketing system with tablet-friendly forms
- Result: $500/week in recovered tickets, 2+ hours daily time saved, 1 week to deploy

AI Gateway Users:
- Result: 60-80% savings on AI costs through smart routing

=== PRICING (Share when asked, but focus on outcomes first) ===

PROPANE SYSTEMS:
- Core ($20K): Customer database + delivery tickets + QuickBooks integration
- Routing Add-on ($10K): Route optimization + driver app
- IoT Add-on ($8K): Tank monitor integration
- Support ($600/month): Includes AI auto-fix

CONCRETE SYSTEMS:
- Phase 1 ($15K): Ticketing + QuickBooks export
- Phase 2 ($12K): Dispatch board + driver app
- Phase 3 ($8K): Customer portal + GPS
- Support ($750/month): Includes AI auto-fix

GENERAL:
- Custom builds range from $15K-$40K depending on complexity
- Typical timeline: 1-4 weeks from kickoff to deployment
- You own everything. Full documentation included.

=== COMPETITOR POSITIONING ===

PROPANE COMPETITORS:
- ADD Systems (E3 + Raven): Expensive, batch sync (not real-time), VPN required
- Suburban Software: Propane-specific but weak mobile experience
- Droplet Fuel: Good dispatch, weak accounting integration
- Cargas Energy: Modern interface but custom pricing (hard to budget)

CONCRETE COMPETITORS:
- Command Alkon: Enterprise-grade but too expensive for small producers
- Jonel: Better fit for mid-size but still complex
- Marcotte: Focused on batching, weak dispatch integration
- ConcreteGo/Dispatch360: Limited accounting integration

ResultantAI advantages to emphasize:
- Fixed pricing (no surprises)
- Real-time sync vs. daily batch updates
- QuickBooks native integration
- Deploys in weeks, not months
- You own everything, including documentation

=== CONVERSATION FLOW ===

Follow the Hook → Story → Proof → CTA structure:

1. HOOK: Identify their pain point from their question
2. STORY: Explain how the problem costs them money or time
3. PROOF: Share a relevant case study with specific numbers
4. CTA: Offer a logical next step (usually booking a discovery call)

Example:
Visitor: "We are still using paper tickets for our propane deliveries."

Response: "Paper tickets are one of the biggest revenue leaks in propane delivery. Tickets get lost, damaged, or illegible. Drivers forget to log surcharges. And someone has to type everything into the system at the end of the day.

One quarry operation we worked with was losing $500 per week in tickets that never got billed. We built them a digital system in one week. Now every load is captured the moment it happens and syncs directly to their accounting software.

Would a 15-minute call make sense to see if something similar would work for your operation? You can book directly at https://meetings.hubspot.com/resultantai/paper-to-digital"

=== HANDLING OBJECTIONS ===

"Too expensive":
- Frame the cost against the problem cost. Example: "If you are losing $500/week in missed tickets, the system pays for itself in 8 weeks."
- Mention fixed pricing. No surprises. No ongoing enterprise fees.

"We already have software":
- Ask what it is and whether it actually solves the problem
- Most legacy software syncs once daily. ResultantAI systems work in real-time.
- Position as an upgrade or integration, not a replacement war.

"Not ready yet / timing":
- Respect their timeline
- Offer something low-commitment: "I can send you a case study so you have it when the timing is right."

"How is this different from [competitor]?":
- Acknowledge the competitor fairly
- Focus on specific differences: pricing model, real-time vs. batch, deployment speed, QuickBooks integration

=== WHAT NOT TO DO ===

- Do not claim capabilities that are not documented here
- Do not guarantee specific revenue recovery amounts without knowing their situation
- Do not disparage competitors. State facts about differences.
- Do not pressure visitors to book calls. Answer their questions fully.
- Do not use technical jargon unless they use it first
- Do not make up case studies or statistics

=== ESCALATION ===

If a visitor asks something you cannot answer:
- Acknowledge you do not have that specific information
- Offer to connect them with Chris directly: support@resultantai.com
- Or suggest they book a discovery call where their specific questions can be addressed

=== CONVERSATION STYLE ===

Keep responses concise (2-4 short paragraphs). Be conversational but professional. Ask clarifying questions when needed to better understand their situation."""

# ============================================================================
# PAGE-AWARE WELCOME MESSAGES
# ============================================================================

WELCOME_MESSAGES = {
    'homepage': "Hey there. I can help you figure out if ResultantAI is a fit for your business. What kind of work does your company do?",
    'propane': "Looking at propane delivery systems? I can answer questions about pricing, deployment timeline, or how our system compares to ADD Systems and Suburban. What would be most helpful?",
    'logistics': "Interested in trucking and logistics dispatch systems? I can explain how we help eliminate paper tickets and speed up billing. What would you like to know?",
    'field-services': "Checking out our field services solutions? I can tell you about our 24/7 AI call handling, dispatch automation, and how Wayne Conn Plumbing captured $5K/month with our system. What interests you most?",
    'agencies': "Looking at solutions for marketing agencies? I can explain how Adleg reduced their audit time from 90 minutes to 2 minutes, or talk about AI cost control with our Gateway product. What brings you here?",
    'b2b': "Interested in scaling your B2B service business? I can discuss sales automation, onboarding systems, or how to remove yourself as the bottleneck. What challenge are you facing?",
    'case-studies': "These case studies show real results from real clients. Want me to help you figure out which one is most relevant to your situation?",
    'gateway': "AI Gateway helps agencies and SaaS companies control AI costs. Are you looking to reduce your current spend, or just exploring options?",
    'default': "Hey there. I can help you understand how ResultantAI builds revenue systems for service businesses. What would you like to know?"
}

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def detect_industry(message: str, conversation_history: List[Dict[str, str]], page_type: str) -> str:
    """
    Detect visitor's industry from their message, conversation history, and page context.

    Returns: propane|concrete|field-services|agency|b2b|trucking|general
    """
    message_lower = message.lower()

    # Check for explicit industry mentions in the current message
    if any(word in message_lower for word in ['propane', 'fuel', 'heating oil', 'degree day', 'tank monitor']):
        return 'propane'

    if any(word in message_lower for word in ['concrete', 'ready-mix', 'ready mix', 'batching', 'yard', 'pour']):
        return 'concrete'

    if any(word in message_lower for word in ['plumb', 'hvac', 'electric', 'technician', 'service call', 'dispatch']):
        return 'field-services'

    if any(word in message_lower for word in ['agency', 'marketing', 'client work', 'reporting', 'lead qual']):
        return 'agency'

    if any(word in message_lower for word in ['trucking', 'logistics', 'hauling', 'freight', 'bol', 'bill of lading']):
        return 'trucking'

    if any(word in message_lower for word in ['b2b', 'consulting', 'professional services', 'founder', 'scale']):
        return 'b2b'

    # Check page context
    if page_type in ['propane', 'field-services', 'agencies', 'b2b', 'logistics']:
        return page_type

    # Check conversation history for industry clues
    full_conversation = ' '.join([msg.get('content', '') for msg in conversation_history]).lower()

    if 'propane' in full_conversation or 'fuel delivery' in full_conversation:
        return 'propane'
    if 'concrete' in full_conversation:
        return 'concrete'
    if 'plumb' in full_conversation or 'hvac' in full_conversation:
        return 'field-services'
    if 'agency' in full_conversation or 'marketing' in full_conversation:
        return 'agency'
    if 'trucking' in full_conversation or 'logistics' in full_conversation:
        return 'trucking'

    return 'general'


def should_offer_booking(message: str, assistant_response: str) -> bool:
    """
    Determine if we should suggest booking a call based on the conversation.
    """
    message_lower = message.lower()
    response_lower = assistant_response.lower()

    # Offer booking if visitor shows clear interest
    interest_signals = [
        'interested', 'how much', 'pricing', 'cost', 'get started',
        'demo', 'call', 'talk', 'discuss', 'learn more', 'tell me more',
        'next step', 'how do we', 'sign up', 'try it'
    ]

    # Don't offer if they just said hi or asked a basic question
    basic_queries = ['hello', 'hi ', 'hey', 'what do you', 'who are you', 'what is resultant']

    if any(signal in message_lower for signal in interest_signals):
        return True

    if any(basic in message_lower for basic in basic_queries):
        return False

    # Offer if the response mentions a case study or specific results
    if 'case study' in response_lower or '$' in assistant_response:
        return True

    return False


def get_welcome_message(page_type: str) -> str:
    """Get appropriate welcome message based on page context."""
    return WELCOME_MESSAGES.get(page_type, WELCOME_MESSAGES['default'])


def format_conversation_for_claude(conversation_history: List[Dict[str, str]], current_message: str, page_context: Dict[str, Any]) -> List[Dict[str, str]]:
    """
    Format conversation history for Claude API.
    Includes page context in the first message if available.
    """
    messages = []

    # Add page context to the conversation if this is the first message
    if not conversation_history and page_context.get('page_type'):
        page_type = page_context.get('page_type', 'homepage')
        page_info = f"\n\n[Page Context: User is viewing the {page_type} page"

        if page_context.get('utm_source'):
            page_info += f", came from {page_context['utm_source']}"

        page_info += "]"

        # Add context as a system-like note in the first user message
        messages.append({
            'role': 'user',
            'content': page_info
        })
        messages.append({
            'role': 'assistant',
            'content': get_welcome_message(page_type)
        })

    # Add conversation history
    for msg in conversation_history:
        if msg.get('role') and msg.get('content'):
            messages.append({
                'role': msg['role'],
                'content': msg['content']
            })

    # Add current message
    messages.append({
        'role': 'user',
        'content': current_message
    })

    return messages


# ============================================================================
# MAIN CHAT FUNCTION
# ============================================================================

def chat(input_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Main chatbot function. Processes user message and returns assistant response.
    """
    try:
        # Extract input data
        user_message = input_data.get('message', '').strip()
        conversation_history = input_data.get('conversation_history', [])
        page_context = input_data.get('page_context', {})

        if not user_message:
            return {
                'error': 'Message is required',
                'timestamp': datetime.utcnow().isoformat() + 'Z'
            }

        # Detect industry
        page_type = page_context.get('page_type', 'homepage')
        detected_industry = detect_industry(user_message, conversation_history, page_type)

        # Format messages for Claude
        messages = format_conversation_for_claude(conversation_history, user_message, page_context)

        # Call Claude API
        response = client.messages.create(
            model=MODEL_NAME,
            max_tokens=MAX_TOKENS,
            system=SYSTEM_PROMPT,
            messages=messages
        )

        # Extract assistant response
        assistant_message = response.content[0].text

        # Determine if we should offer booking
        offer_booking = should_offer_booking(user_message, assistant_message)
        booking_url = "https://meetings.hubspot.com/resultantai/paper-to-digital" if offer_booking else None

        return {
            'response': assistant_message,
            'detected_industry': detected_industry,
            'should_offer_booking': offer_booking,
            'booking_url': booking_url,
            'timestamp': datetime.utcnow().isoformat() + 'Z'
        }

    except anthropic.APIError as e:
        return {
            'error': f'Anthropic API error: {str(e)}',
            'error_type': 'api_error',
            'timestamp': datetime.utcnow().isoformat() + 'Z'
        }

    except Exception as e:
        return {
            'error': f'Unexpected error: {str(e)}',
            'error_type': type(e).__name__,
            'timestamp': datetime.utcnow().isoformat() + 'Z'
        }


# ============================================================================
# MAIN (for CLI usage)
# ============================================================================

if __name__ == '__main__':
    # Read JSON from stdin
    try:
        input_data = json.loads(sys.stdin.read())
        result = chat(input_data)
        print(json.dumps(result, indent=2))

    except json.JSONDecodeError as e:
        print(json.dumps({
            'error': f'Invalid JSON input: {str(e)}',
            'timestamp': datetime.utcnow().isoformat() + 'Z'
        }))
        sys.exit(1)

    except Exception as e:
        print(json.dumps({
            'error': f'Fatal error: {str(e)}',
            'error_type': type(e).__name__,
            'timestamp': datetime.utcnow().isoformat() + 'Z'
        }))
        sys.exit(1)
