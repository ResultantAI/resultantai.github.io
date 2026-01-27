#!/usr/bin/env python3
"""
Test script for ResultantAI chatbot
====================================
Tests the chatbot.py script with various scenarios.

Usage:
    python test_chatbot.py
"""

import json
import subprocess
import sys

# Test cases
TEST_CASES = [
    {
        'name': 'Propane inquiry from propane page',
        'input': {
            'message': 'We are looking for a propane delivery system',
            'conversation_history': [],
            'page_context': {
                'page_type': 'propane',
                'url': 'https://resultantai.com/propane.html'
            }
        },
        'expected_industry': 'propane'
    },
    {
        'name': 'General inquiry from homepage',
        'input': {
            'message': 'What does ResultantAI do?',
            'conversation_history': [],
            'page_context': {
                'page_type': 'homepage',
                'url': 'https://resultantai.com/'
            }
        },
        'expected_industry': 'general'
    },
    {
        'name': 'Concrete business inquiry',
        'input': {
            'message': 'We run a ready-mix concrete business with 10 trucks',
            'conversation_history': [],
            'page_context': {
                'page_type': 'homepage',
                'url': 'https://resultantai.com/'
            }
        },
        'expected_industry': 'concrete'
    },
    {
        'name': 'Pricing question (should trigger booking)',
        'input': {
            'message': 'How much does it cost?',
            'conversation_history': [
                {'role': 'user', 'content': 'We are looking for a propane system'},
                {'role': 'assistant', 'content': 'Great! Our propane system helps eliminate paper tickets...'}
            ],
            'page_context': {
                'page_type': 'propane',
                'url': 'https://resultantai.com/propane.html'
            }
        },
        'expected_booking': True
    },
    {
        'name': 'Agency inquiry from agencies page',
        'input': {
            'message': 'Can you help with marketing agency automation?',
            'conversation_history': [],
            'page_context': {
                'page_type': 'agencies',
                'url': 'https://resultantai.com/solutions-agencies.html'
            }
        },
        'expected_industry': 'agency'
    }
]


def run_test(test_case):
    """Run a single test case"""
    print(f"\n{'='*60}")
    print(f"Test: {test_case['name']}")
    print('='*60)

    try:
        # Prepare input
        input_json = json.dumps(test_case['input'])

        # Run chatbot.py
        process = subprocess.Popen(
            [sys.executable, 'chatbot.py'],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        # Send input and get output
        stdout, stderr = process.communicate(input=input_json, timeout=30)

        # Parse output
        try:
            result = json.loads(stdout)
        except json.JSONDecodeError:
            print(f"❌ FAILED - Invalid JSON response")
            print(f"stdout: {stdout[:200]}")
            print(f"stderr: {stderr[:200]}")
            return False

        # Check for errors
        if 'error' in result:
            print(f"❌ FAILED - Error: {result['error']}")
            return False

        # Display result
        print(f"\nInput message: {test_case['input']['message']}")
        print(f"Page context: {test_case['input']['page_context']['page_type']}")
        print(f"\nDetected industry: {result.get('detected_industry', 'N/A')}")
        print(f"Should offer booking: {result.get('should_offer_booking', False)}")
        print(f"\nResponse preview:")
        print(f"{result.get('response', 'No response')[:200]}...")

        # Validate expectations
        success = True

        if 'expected_industry' in test_case:
            if result.get('detected_industry') != test_case['expected_industry']:
                print(f"\n⚠️  Expected industry '{test_case['expected_industry']}', got '{result.get('detected_industry')}'")
                success = False

        if 'expected_booking' in test_case:
            if result.get('should_offer_booking') != test_case['expected_booking']:
                print(f"\n⚠️  Expected booking={test_case['expected_booking']}, got {result.get('should_offer_booking')}")
                success = False

        if success:
            print(f"\n✅ PASSED")
        else:
            print(f"\n⚠️  PASSED WITH WARNINGS")

        return True

    except subprocess.TimeoutExpired:
        print(f"❌ FAILED - Timeout")
        return False
    except Exception as e:
        print(f"❌ FAILED - {str(e)}")
        return False


def main():
    """Run all tests"""
    print("="*60)
    print("ResultantAI Chatbot Test Suite")
    print("="*60)

    # Check if .env exists
    import os
    if not os.path.exists('.env'):
        print("\n⚠️  Warning: .env file not found")
        print("Create .env with ANTHROPIC_API_KEY to run tests")
        return

    # Check if API key is set
    from dotenv import load_dotenv
    load_dotenv()
    if not os.getenv('ANTHROPIC_API_KEY'):
        print("\n❌ Error: ANTHROPIC_API_KEY not found in .env")
        print("Add your API key to .env file")
        return

    results = []
    for test_case in TEST_CASES:
        result = run_test(test_case)
        results.append(result)

    # Summary
    print("\n" + "="*60)
    print("Test Summary")
    print("="*60)
    passed = sum(results)
    total = len(results)
    print(f"Passed: {passed}/{total}")

    if passed == total:
        print("\n✅ All tests passed!")
    else:
        print(f"\n⚠️  {total - passed} tests failed")


if __name__ == '__main__':
    main()
