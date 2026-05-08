# Voice Agent Schema Documentation

Complete reference for configuring and validating AI voice agents using the VelocityMCA schema system.

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Schema Structure](#schema-structure)
4. [Configuration Guide](#configuration-guide)
5. [Testing & Validation](#testing--validation)
6. [Examples](#examples)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The Voice Agent Schema provides a standardized JSON configuration format for AI voice agents. It defines:

- **Agent personality and voice settings**
- **Conversation flow and dialogue management**
- **Lead qualification rules and business logic**
- **CRM integration and data mapping**
- **Compliance and analytics settings**

### Key Benefits

- **Consistency**: Standardized configuration across all voice agents
- **Validation**: Automatic schema validation prevents configuration errors
- **Testing**: Built-in test framework for scenario validation
- **Documentation**: Self-documenting JSON structure
- **Flexibility**: Extensible for different industries and use cases

---

## Quick Start

### 1. View Available Schemas

```bash
# List all schema files
ls -lh schema.json inbound_qualifier.json VOICE_AGENT_SCHEMA_README.md

# View the base schema structure
cat schema.json

# View the MCA implementation example
cat inbound_qualifier.json
```

### 2. Validate a Configuration

```bash
# Validate the MCA inbound qualifier schema
node test-scenario.js inbound_qualifier.json

# Validate with a specific test payload
node test-scenario.js inbound_qualifier.json --payload test-payloads/qualified.json
```

### 3. Run Test Scenarios

```bash
# Run all test scenarios
node test-scenario.js inbound_qualifier.json --all

# Run specific scenario
node test-scenario.js inbound_qualifier.json --payload test-payloads/unqualified.json
```

---

## Schema Structure

### Top-Level Properties

```json
{
  "agent_name": "unique_identifier",
  "version": "1.0.0",
  "description": "Human-readable description",
  "agent_config": { },
  "conversation_flow": { },
  "qualification_rules": { },
  "integration": { },
  "analytics": { },
  "compliance": { }
}
```

### 1. Agent Configuration (`agent_config`)

Defines the voice agent's personality, voice, and behavior.

#### Voice Settings

```json
"voice": {
  "provider": "elevenlabs",
  "voice_id": "sarah_professional",
  "speed": 1.1,
  "pitch": 0
}
```

**Supported Providers**: `elevenlabs`, `azure`, `google`, `aws_polly`

**Speed Range**: 0.5 - 2.0 (1.0 = normal)

**Pitch Range**: -20 to +20 (0 = normal)

#### Personality Settings

```json
"personality": {
  "tone": "professional",
  "formality": "business_casual",
  "verbosity": "moderate"
}
```

**Tone Options**: `professional`, `friendly`, `empathetic`, `assertive`, `consultative`

**Formality Options**: `casual`, `business_casual`, `formal`

**Verbosity Options**: `concise`, `moderate`, `detailed`

#### Behavior Settings

```json
"interruption_sensitivity": "medium",
"silence_timeout": 3
```

**Interruption Sensitivity**: `low`, `medium`, `high`
- Low: Allows customer to finish completely before responding
- Medium: Responds naturally to pauses
- High: Responds quickly to brief pauses

**Silence Timeout**: 1-10 seconds before prompting customer

---

### 2. Conversation Flow (`conversation_flow`)

Defines the structure and content of customer conversations.

#### Greeting

```json
"greeting": {
  "script": "Good afternoon! This is Sarah from VelocityMCA...",
  "variants": [
    "Hi! This is Sarah calling from VelocityMCA...",
    "Hello! Sarah here from VelocityMCA..."
  ],
  "time_based": true
}
```

**Variables**: Use `{{variable_name}}` for dynamic content
- `{{contact_name}}` - Customer's name
- `{{business_name}}` - Business name
- `{{time_of_day}}` - morning/afternoon/evening (if time_based: true)

#### Questions

Questions are asked sequentially to gather information.

```json
{
  "id": "monthly_revenue",
  "question": "What is your average monthly revenue?",
  "field": "monthly_revenue",
  "type": "currency",
  "required": true,
  "validation": {
    "min": 0,
    "max": 10000000
  }
}
```

**Question Types**:
- `text` - Free-form text response
- `number` - Numeric value
- `currency` - Monetary amount
- `date` - Date value
- `boolean` - Yes/no response
- `choice` - Multiple choice (requires validation.choices)

**Validation Rules**:
- `min` / `max` - Range for numbers/currency
- `pattern` - Regex pattern for text
- `choices` - Array of valid options for choice type

#### Follow-up Questions

Conditional questions based on previous answers:

```json
"follow_up": {
  "condition": "value < 6",
  "question_id": "new_business_followup"
}
```

**Condition Syntax**:
- `value < 6` - Less than
- `value > 100000` - Greater than
- `value == 'yes'` - Equals
- `value != 'no'` - Not equals

#### Objection Handling

Automatic responses to common objections:

```json
{
  "trigger": "too expensive|high cost|rates too high",
  "response": "I completely understand your concern about costs..."
}
```

**Trigger Syntax**: Pipe-separated keywords (regex)

#### Closing Scripts

Different closings based on qualification outcome:

```json
"closing": {
  "qualified": "Excellent! Based on what you've shared...",
  "unqualified": "Thank you for your time...",
  "undecided": "Thanks for your time. I'll send you information..."
}
```

---

### 3. Qualification Rules (`qualification_rules`)

Business logic for determining lead quality.

#### Criteria

```json
"criteria": [
  {
    "field": "monthly_revenue",
    "operator": "greater_than_or_equal",
    "value": 15000,
    "required": true,
    "weight": 30
  }
]
```

**Operators**:
- `equals` / `not_equals`
- `greater_than` / `less_than`
- `greater_than_or_equal` / `less_than_or_equal`
- `contains` - Text contains substring
- `in_list` - Value in array

**Weight**: 0-100 (importance for scoring)

**Required**: Must be met to qualify (true/false)

#### Scoring

```json
"qualification_threshold": 70
```

Lead qualifies if weighted score ≥ threshold percentage.

**Example Calculation**:
- Criterion 1: Met (weight 30) → +30
- Criterion 2: Met (weight 25) → +25
- Criterion 3: Not met (weight 20) → +0
- Criterion 4: Met (weight 15) → +15
- **Total**: 70/90 possible = 77.8% → **QUALIFIED**

#### Auto-Disqualification

Immediate disqualification conditions:

```json
"auto_disqualify": [
  {
    "field": "time_in_business_months",
    "operator": "less_than",
    "value": 3
  }
]
```

If any auto-disqualify condition is met, lead is rejected regardless of score.

---

### 4. Integration (`integration`)

CRM and notification system configuration.

#### CRM Settings

```json
"crm": {
  "provider": "hubspot",
  "actions": {
    "qualified": {
      "create_lead": true,
      "assign_to": "sales_team_mca",
      "tags": ["mca_qualified", "ai_qualified", "hot_lead"],
      "send_notification": true
    },
    "unqualified": {
      "create_lead": true,
      "add_to_nurture": true,
      "nurture_campaign_id": "nurture_new_business_6month"
    }
  },
  "field_mapping": {
    "contact_name": "firstname,lastname",
    "business_name": "company",
    "monthly_revenue": "monthly_revenue"
  }
}
```

**Supported CRMs**: `salesforce`, `hubspot`, `pipedrive`, `zoho`, `custom`

**Field Mapping**: Maps agent fields to CRM fields
- Simple: `"agent_field": "crm_field"`
- Multiple: `"agent_field": "crm_field1,crm_field2"`

#### Notifications

```json
"notifications": {
  "email": ["chris@resultantai.com"],
  "sms": ["+15551234567"],
  "webhook": "https://api.velocitymca.com/webhooks/new_lead"
}
```

---

### 5. Analytics (`analytics`)

Tracking and reporting configuration.

```json
"analytics": {
  "track_metrics": [
    "call_duration",
    "qualification_rate",
    "drop_off_point",
    "objection_frequency",
    "conversion_time"
  ],
  "reporting_interval": "daily"
}
```

**Available Metrics**:
- `call_duration` - Average call length
- `qualification_rate` - % of calls that qualify
- `drop_off_point` - Where customers hang up
- `objection_frequency` - Most common objections
- `conversion_time` - Time from call to conversion

**Reporting Intervals**: `daily`, `weekly`, `monthly`

---

### 6. Compliance (`compliance`)

Legal and regulatory settings.

```json
"compliance": {
  "record_calls": true,
  "recording_disclosure": "This call may be recorded...",
  "gdpr_compliant": true,
  "data_retention_days": 730
}
```

**Data Retention**: 1-3650 days (1 day to 10 years)

---

## Configuration Guide

### Creating a New Voice Agent

#### Step 1: Start with Template

```bash
# Copy the example schema
cp inbound_qualifier.json my_new_agent.json
```

#### Step 2: Update Basic Info

```json
{
  "agent_name": "my_new_agent",
  "version": "1.0.0",
  "description": "Description of what this agent does"
}
```

**Agent Name Rules**:
- Lowercase letters, numbers, underscores only
- 3-50 characters
- Must be unique

#### Step 3: Configure Voice & Personality

Choose voice settings that match your brand:

```json
"agent_config": {
  "voice": {
    "provider": "elevenlabs",
    "voice_id": "your_voice_id",
    "speed": 1.0,
    "pitch": 0
  },
  "personality": {
    "tone": "friendly",
    "formality": "business_casual",
    "verbosity": "concise"
  }
}
```

#### Step 4: Design Conversation Flow

Create your greeting and questions:

```json
"conversation_flow": {
  "greeting": {
    "script": "Your greeting here...",
    "time_based": true
  },
  "questions": [
    {
      "id": "question_1",
      "question": "Your question?",
      "field": "crm_field_name",
      "type": "text",
      "required": true
    }
  ]
}
```

#### Step 5: Define Qualification Rules

Set your business criteria:

```json
"qualification_rules": {
  "criteria": [
    {
      "field": "your_field",
      "operator": "greater_than",
      "value": 1000,
      "required": true,
      "weight": 50
    }
  ],
  "qualification_threshold": 70
}
```

#### Step 6: Configure Integration

Set up CRM connection:

```json
"integration": {
  "crm": {
    "provider": "hubspot",
    "field_mapping": {
      "agent_field": "crm_field"
    }
  },
  "notifications": {
    "email": ["your@email.com"]
  }
}
```

#### Step 7: Validate Configuration

```bash
node test-scenario.js my_new_agent.json
```

---

## Testing & Validation

### Test Scenario Structure

Test payloads simulate customer responses:

```json
{
  "scenario_name": "Qualified Restaurant Owner",
  "description": "Business meets all qualification criteria",
  "expected_outcome": "qualified",
  "responses": {
    "contact_name": "Mike Johnson",
    "business_name": "City Auto Repair",
    "business_type": "Auto Repair Shop",
    "time_in_business_months": 36,
    "monthly_revenue": 85000,
    "funding_amount_requested": 50000,
    "funding_purpose": "equipment",
    "urgency": "within_1_week",
    "phone": "5551234567",
    "email": "mike@cityauto.com"
  }
}
```

### Running Tests

```bash
# Validate schema only
node test-scenario.js inbound_qualifier.json

# Run specific test
node test-scenario.js inbound_qualifier.json --payload test-payloads/qualified.json

# Run all tests
node test-scenario.js inbound_qualifier.json --all

# Verbose output
node test-scenario.js inbound_qualifier.json --payload test-payloads/qualified.json --verbose
```

### Creating Test Payloads

1. Create JSON file in `test-payloads/` directory
2. Include all required fields from conversation questions
3. Set `expected_outcome`: `qualified`, `unqualified`, or `undecided`
4. Run test and verify results

---

## Examples

### Example 1: High-Value Qualified Lead

```json
{
  "scenario_name": "High Revenue Retailer",
  "expected_outcome": "qualified",
  "responses": {
    "contact_name": "Jennifer Martinez",
    "business_name": "Martinez Fashion Boutique",
    "business_type": "Retail Clothing",
    "time_in_business_months": 48,
    "monthly_revenue": 125000,
    "funding_amount_requested": 75000,
    "funding_purpose": "expansion",
    "credit_score": 680,
    "urgency": "immediately",
    "phone": "5559876543",
    "email": "jennifer@martinezfashion.com"
  }
}
```

**Expected Result**: Qualified (high revenue, good credit, immediate urgency)

### Example 2: New Business (Unqualified)

```json
{
  "scenario_name": "New Coffee Shop",
  "expected_outcome": "unqualified",
  "responses": {
    "contact_name": "David Chen",
    "business_name": "Chen's Coffee House",
    "business_type": "Coffee Shop",
    "time_in_business_months": 4,
    "monthly_revenue": 12000,
    "funding_amount_requested": 25000,
    "funding_purpose": "equipment",
    "urgency": "within_1_month",
    "phone": "5551112222",
    "email": "david@chenscoffee.com"
  }
}
```

**Expected Result**: Unqualified (too new, revenue below threshold)

### Example 3: Undecided Lead

```json
{
  "scenario_name": "Needs More Time",
  "expected_outcome": "undecided",
  "responses": {
    "contact_name": "Robert Williams",
    "business_name": "Williams HVAC",
    "business_type": "HVAC Services",
    "time_in_business_months": 24,
    "monthly_revenue": 45000,
    "funding_amount_requested": 30000,
    "funding_purpose": "working_capital",
    "urgency": "just_exploring",
    "phone": "5553334444",
    "email": "rob@williamshvac.com"
  }
}
```

**Expected Result**: Qualified technically, but low urgency may trigger undecided flow

---

## Best Practices

### Voice Agent Design

1. **Keep Greetings Concise**: 20-30 seconds maximum
2. **Ask 8-12 Questions**: Balance thoroughness with call duration
3. **Use Natural Language**: Write like you speak
4. **Acknowledge Responses**: "Great!", "I appreciate that", "Thanks for sharing"
5. **Provide Context**: Explain why you're asking each question

### Qualification Rules

1. **Define Clear Thresholds**: Be specific about minimum requirements
2. **Weight Strategically**: Highest weight to most important criteria
3. **Use Auto-Disqualify Sparingly**: Only for absolute dealbreakers
4. **Test Edge Cases**: Verify borderline scenarios qualify correctly
5. **Document Business Logic**: Add comments explaining criteria

### Testing

1. **Test All Outcomes**: Create scenarios for qualified, unqualified, undecided
2. **Test Edge Cases**: Minimum thresholds, maximum values, missing data
3. **Test Objections**: Verify objection handling triggers correctly
4. **Test Follow-ups**: Ensure conditional questions work
5. **Run Before Deploy**: Always validate before production

### CRM Integration

1. **Map All Fields**: Don't lose any collected data
2. **Use Consistent Naming**: Follow CRM field naming conventions
3. **Tag Appropriately**: Make leads easy to filter and segment
4. **Set Up Notifications**: Ensure sales team gets alerts
5. **Test Integration**: Verify data flows to CRM correctly

---

## Troubleshooting

### Common Errors

#### Error: "Schema validation failed"

**Cause**: JSON doesn't match schema structure

**Fix**: Run validation and check specific error messages

```bash
node test-scenario.js your_agent.json --verbose
```

#### Error: "Field mapping not found"

**Cause**: Question field doesn't match qualification criteria field

**Fix**: Ensure field names are consistent:

```json
// Question
"field": "monthly_revenue"

// Qualification rule
"field": "monthly_revenue"  // Must match exactly
```

#### Error: "Question type mismatch"

**Cause**: Validation rules don't match question type

**Fix**: Align validation with type:

```json
// Correct
{
  "type": "currency",
  "validation": {
    "min": 0,
    "max": 1000000
  }
}

// Incorrect
{
  "type": "text",
  "validation": {
    "min": 0  // Can't use min/max with text
  }
}
```

#### Error: "Qualification threshold not met"

**Cause**: Weights don't add up to 100, or threshold too high

**Fix**: Ensure total possible weight = 100:

```json
"criteria": [
  {"weight": 30},  // 30
  {"weight": 25},  // 55
  {"weight": 20},  // 75
  {"weight": 15},  // 90
  {"weight": 10}   // 100 ✓
]
```

### Debug Mode

Enable verbose logging:

```bash
# Full debug output
node test-scenario.js inbound_qualifier.json --debug

# Step-by-step question flow
node test-scenario.js inbound_qualifier.json --payload test-payloads/qualified.json --verbose
```

### Validation Checklist

Before deploying:

- [ ] Schema validates without errors
- [ ] All required fields are present
- [ ] Field names match between questions and qualification rules
- [ ] Weights add up to 100
- [ ] All test scenarios pass
- [ ] CRM field mapping is correct
- [ ] Notifications are configured
- [ ] Compliance settings are set
- [ ] Voice settings are tested

---

## Advanced Topics

### Dynamic Variables

Use variables in scripts:

```json
"question": "Thanks {{contact_name}}! How long has {{business_name}} been operating?"
```

**Available Variables**:
- `{{contact_name}}` - From contact_name field
- `{{business_name}}` - From business_name field
- `{{funding_amount}}` - From funding_amount_requested field
- Any field collected earlier in conversation

### Conditional Closings

Use different closings based on criteria:

```json
"closing": {
  "qualified": "Great news, {{contact_name}}! You're approved for up to {{approved_amount}}...",
  "unqualified": "Thanks {{contact_name}}. We'll follow up in {{follow_up_months}} months..."
}
```

### Multi-Language Support

Configure for different languages:

```json
"agent_config": {
  "language": "es-US",  // Spanish (US)
  "personality": {
    "tone": "friendly",
    "formality": "formal"  // More formal for Spanish
  }
}
```

**Supported Languages**: `en-US`, `en-GB`, `es-US`, `es-MX`, `fr-FR`, `de-DE`

---

## Support

### Resources

- **Schema Reference**: `schema.json`
- **Example Implementation**: `inbound_qualifier.json`
- **Test Framework**: `test-scenario.js`
- **Test Samples**: `test-payloads/`

### Contact

- **Technical Support**: chris@resultantai.com
- **Documentation**: [GitHub Repository](https://github.com/ResultantAI/mca-voice-agent-demo)
- **Issues**: Report bugs via GitHub Issues

---

## Changelog

### Version 1.0.0 (2025-11-18)

- Initial schema release
- MCA inbound qualifier example
- Test framework
- Complete documentation

---

**Last Updated**: November 18, 2025
**Schema Version**: 1.0.0
**Maintained By**: ResultantAI
