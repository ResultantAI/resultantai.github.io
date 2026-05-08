#!/usr/bin/env node

/**
 * Voice Agent Schema Test Runner
 *
 * Validates voice agent configurations against the base schema
 * and runs test scenarios to verify qualification logic.
 *
 * Usage:
 *   node test-scenario.js <schema-file> [options]
 *
 * Options:
 *   --payload <file>   Run test with specific payload
 *   --all              Run all tests in test-payloads/
 *   --interactive      Interactive mode - answer questions in real-time
 *   --verbose          Show detailed output
 *   --debug            Show debug information
 *
 * Examples:
 *   node test-scenario.js inbound_qualifier.json
 *   node test-scenario.js inbound_qualifier.json --payload test-payloads/qualified.json
 *   node test-scenario.js inbound_qualifier.json --all --verbose
 *   node test-scenario.js inbound_qualifier.json --interactive
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Parse command line arguments
const args = process.argv.slice(2);
const schemaFile = args[0];
const options = {
  payload: null,
  all: args.includes('--all'),
  interactive: args.includes('--interactive'),
  verbose: args.includes('--verbose'),
  debug: args.includes('--debug')
};

// Extract --payload value
const payloadIndex = args.indexOf('--payload');
if (payloadIndex !== -1 && args[payloadIndex + 1]) {
  options.payload = args[payloadIndex + 1];
}

/**
 * Print colored output
 */
function print(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Print section header
 */
function printHeader(title) {
  console.log('');
  print('═'.repeat(70), 'cyan');
  print(`  ${title}`, 'bright');
  print('═'.repeat(70), 'cyan');
  console.log('');
}

/**
 * Print success message
 */
function success(message) {
  print(`✓ ${message}`, 'green');
}

/**
 * Print error message
 */
function error(message) {
  print(`✗ ${message}`, 'red');
}

/**
 * Print warning message
 */
function warning(message) {
  print(`⚠ ${message}`, 'yellow');
}

/**
 * Print info message
 */
function info(message) {
  print(`ℹ ${message}`, 'blue');
}

/**
 * Show usage information
 */
function showUsage() {
  printHeader('Voice Agent Schema Test Runner');
  console.log('Usage:');
  console.log('  node test-scenario.js <schema-file> [options]');
  console.log('');
  console.log('Options:');
  console.log('  --payload <file>   Run test with specific payload');
  console.log('  --all              Run all tests in test-payloads/');
  console.log('  --interactive      Interactive mode - answer questions in real-time');
  console.log('  --verbose          Show detailed output');
  console.log('  --debug            Show debug information');
  console.log('');
  console.log('Examples:');
  console.log('  node test-scenario.js inbound_qualifier.json');
  console.log('  node test-scenario.js inbound_qualifier.json --payload test-payloads/qualified.json');
  console.log('  node test-scenario.js inbound_qualifier.json --all --verbose');
  console.log('  node test-scenario.js inbound_qualifier.json --interactive');
  console.log('');
}

/**
 * Load JSON file
 */
function loadJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      error(`File not found: ${filePath}`);
    } else if (err instanceof SyntaxError) {
      error(`Invalid JSON in ${filePath}: ${err.message}`);
    } else {
      error(`Error loading ${filePath}: ${err.message}`);
    }
    return null;
  }
}

/**
 * Validate required schema properties
 */
function validateSchema(config) {
  const errors = [];
  const warnings = [];

  // Required top-level properties
  const requiredProps = [
    'agent_name',
    'version',
    'agent_config',
    'conversation_flow',
    'qualification_rules',
    'integration'
  ];

  requiredProps.forEach(prop => {
    if (!config[prop]) {
      errors.push(`Missing required property: ${prop}`);
    }
  });

  // Validate agent_name format
  if (config.agent_name && !/^[a-z0-9_]{3,50}$/.test(config.agent_name)) {
    errors.push('agent_name must be 3-50 characters, lowercase letters, numbers, and underscores only');
  }

  // Validate version format
  if (config.version && !/^\d+\.\d+\.\d+$/.test(config.version)) {
    errors.push('version must follow semantic versioning (e.g., 1.0.0)');
  }

  // Validate agent_config
  if (config.agent_config) {
    if (!config.agent_config.voice) {
      errors.push('agent_config.voice is required');
    } else {
      if (!config.agent_config.voice.provider) {
        errors.push('agent_config.voice.provider is required');
      }
      if (!config.agent_config.voice.voice_id) {
        errors.push('agent_config.voice.voice_id is required');
      }
    }

    if (!config.agent_config.language) {
      warnings.push('agent_config.language not set (default: en-US)');
    }

    if (!config.agent_config.personality) {
      warnings.push('agent_config.personality not configured');
    }
  }

  // Validate conversation_flow
  if (config.conversation_flow) {
    if (!config.conversation_flow.greeting) {
      errors.push('conversation_flow.greeting is required');
    }

    if (!config.conversation_flow.questions || config.conversation_flow.questions.length === 0) {
      errors.push('conversation_flow.questions must have at least one question');
    } else {
      // Validate each question
      config.conversation_flow.questions.forEach((q, index) => {
        if (!q.id) {
          errors.push(`Question ${index + 1}: missing id`);
        }
        if (!q.question) {
          errors.push(`Question ${index + 1}: missing question text`);
        }
        if (!q.field) {
          errors.push(`Question ${index + 1}: missing field name`);
        }
        if (!q.type) {
          errors.push(`Question ${index + 1}: missing type`);
        }
      });
    }

    if (!config.conversation_flow.closing) {
      errors.push('conversation_flow.closing is required');
    } else {
      if (!config.conversation_flow.closing.qualified) {
        errors.push('conversation_flow.closing.qualified is required');
      }
      if (!config.conversation_flow.closing.unqualified) {
        errors.push('conversation_flow.closing.unqualified is required');
      }
    }
  }

  // Validate qualification_rules
  if (config.qualification_rules) {
    if (!config.qualification_rules.criteria || config.qualification_rules.criteria.length === 0) {
      errors.push('qualification_rules.criteria must have at least one criterion');
    } else {
      // Calculate total weight
      let totalWeight = 0;
      config.qualification_rules.criteria.forEach((criterion, index) => {
        if (!criterion.field) {
          errors.push(`Criterion ${index + 1}: missing field`);
        }
        if (!criterion.operator) {
          errors.push(`Criterion ${index + 1}: missing operator`);
        }
        if (criterion.value === undefined) {
          errors.push(`Criterion ${index + 1}: missing value`);
        }
        if (criterion.weight !== undefined) {
          totalWeight += criterion.weight;
        }
      });

      // Check if weights add up to 100
      if (totalWeight > 0 && totalWeight !== 100) {
        warnings.push(`Total weight is ${totalWeight}, should be 100 for proper scoring`);
      }
    }

    if (config.qualification_rules.qualification_threshold === undefined) {
      warnings.push('qualification_threshold not set (default: 70)');
    }
  }

  // Validate integration
  if (config.integration) {
    if (!config.integration.crm) {
      errors.push('integration.crm is required');
    } else {
      if (!config.integration.crm.provider) {
        errors.push('integration.crm.provider is required');
      }
      if (!config.integration.crm.actions) {
        warnings.push('integration.crm.actions not configured');
      }
    }
  }

  return { errors, warnings };
}

/**
 * Evaluate a qualification criterion
 */
function evaluateCriterion(criterion, responses) {
  const fieldValue = responses[criterion.field];
  const targetValue = criterion.value;

  if (fieldValue === undefined || fieldValue === null) {
    return false;
  }

  switch (criterion.operator) {
    case 'equals':
      return fieldValue == targetValue;

    case 'not_equals':
      return fieldValue != targetValue;

    case 'greater_than':
      return Number(fieldValue) > Number(targetValue);

    case 'less_than':
      return Number(fieldValue) < Number(targetValue);

    case 'greater_than_or_equal':
      return Number(fieldValue) >= Number(targetValue);

    case 'less_than_or_equal':
      return Number(fieldValue) <= Number(targetValue);

    case 'contains':
      return String(fieldValue).toLowerCase().includes(String(targetValue).toLowerCase());

    case 'in_list':
      return Array.isArray(targetValue) && targetValue.includes(fieldValue);

    default:
      warning(`Unknown operator: ${criterion.operator}`);
      return false;
  }
}

/**
 * Calculate qualification score
 */
function calculateQualification(config, responses) {
  const result = {
    qualified: false,
    score: 0,
    maxScore: 0,
    percentage: 0,
    metCriteria: [],
    failedCriteria: [],
    autoDisqualified: false,
    autoDisqualifyReason: null
  };

  // Check auto-disqualification
  if (config.qualification_rules.auto_disqualify) {
    for (const rule of config.qualification_rules.auto_disqualify) {
      if (evaluateCriterion(rule, responses)) {
        result.autoDisqualified = true;
        result.autoDisqualifyReason = `${rule.field} ${rule.operator} ${rule.value}`;
        return result;
      }
    }
  }

  // Evaluate criteria
  config.qualification_rules.criteria.forEach(criterion => {
    const met = evaluateCriterion(criterion, responses);
    const weight = criterion.weight || 0;

    result.maxScore += weight;

    if (met) {
      result.score += weight;
      result.metCriteria.push({
        field: criterion.field,
        operator: criterion.operator,
        value: criterion.value,
        weight: weight
      });
    } else {
      result.failedCriteria.push({
        field: criterion.field,
        operator: criterion.operator,
        value: criterion.value,
        weight: weight,
        actualValue: responses[criterion.field]
      });
    }
  });

  // Calculate percentage
  result.percentage = result.maxScore > 0 ? (result.score / result.maxScore) * 100 : 0;

  // Determine qualification
  const threshold = config.qualification_rules.qualification_threshold || 70;
  result.qualified = result.percentage >= threshold;

  return result;
}

/**
 * Run a single test scenario
 */
function runTest(config, testPayload, testName) {
  if (options.verbose) {
    printHeader(`Test: ${testName}`);
    info(`Description: ${testPayload.description || 'N/A'}`);
    info(`Expected Outcome: ${testPayload.expected_outcome || 'N/A'}`);
    console.log('');
  }

  const result = calculateQualification(config, testPayload.responses);

  // Display results
  if (options.verbose) {
    print('Qualification Result:', 'bright');
    console.log('');

    if (result.autoDisqualified) {
      error(`Auto-Disqualified: ${result.autoDisqualifyReason}`);
    } else {
      console.log(`  Score: ${result.score}/${result.maxScore} (${result.percentage.toFixed(1)}%)`);
      console.log(`  Status: ${result.qualified ? colors.green + 'QUALIFIED' : colors.red + 'UNQUALIFIED'}${colors.reset}`);
      console.log('');

      if (result.metCriteria.length > 0) {
        print('  Met Criteria:', 'green');
        result.metCriteria.forEach(c => {
          console.log(`    ✓ ${c.field} ${c.operator} ${c.value} (weight: ${c.weight})`);
        });
        console.log('');
      }

      if (result.failedCriteria.length > 0) {
        print('  Failed Criteria:', 'red');
        result.failedCriteria.forEach(c => {
          console.log(`    ✗ ${c.field} ${c.operator} ${c.value} (weight: ${c.weight})`);
          console.log(`      Actual value: ${c.actualValue}`);
        });
        console.log('');
      }
    }
  }

  // Check if result matches expected outcome
  const expectedOutcome = testPayload.expected_outcome;
  let passed = true;
  let message = '';

  if (expectedOutcome) {
    if (result.autoDisqualified) {
      passed = expectedOutcome === 'unqualified';
      message = passed ? 'Test passed (auto-disqualified as expected)' : 'Test failed (unexpected auto-disqualification)';
    } else {
      const actualOutcome = result.qualified ? 'qualified' : 'unqualified';
      passed = actualOutcome === expectedOutcome;
      message = passed
        ? `Test passed (${actualOutcome} as expected)`
        : `Test failed (expected ${expectedOutcome}, got ${actualOutcome})`;
    }
  } else {
    message = result.qualified ? 'Result: QUALIFIED' : 'Result: UNQUALIFIED';
  }

  if (passed) {
    success(message);
  } else {
    error(message);
  }

  console.log('');

  return { passed, result };
}

/**
 * Run interactive mode - ask questions and collect responses
 */
async function runInteractive(config) {
  printHeader('Interactive Qualification Test');

  print('🎤 AI Voice Agent Simulation', 'cyan');
  console.log('');
  info('Answer the questions below as if you were a customer calling about MCA funding.');
  console.log('');

  // Create readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Promisify question
  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  const responses = {};

  // Show greeting
  if (config.conversation_flow.greeting && config.conversation_flow.greeting.script) {
    print('AI Agent:', 'cyan');
    console.log(`  "${config.conversation_flow.greeting.script}"`);
    console.log('');
  }

  // Ask each question
  const questions = config.conversation_flow.questions || [];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    // Replace variables in question text
    let questionText = q.question;
    Object.keys(responses).forEach(key => {
      questionText = questionText.replace(`{{${key}}}`, responses[key]);
    });

    print(`Question ${i + 1}/${questions.length}:`, 'bright');
    print(`AI: ${questionText}`, 'cyan');

    // Show validation hints
    if (q.validation) {
      const hints = [];
      if (q.validation.min !== undefined) hints.push(`min: ${q.validation.min}`);
      if (q.validation.max !== undefined) hints.push(`max: ${q.validation.max}`);
      if (q.validation.choices) hints.push(`choices: ${q.validation.choices.join(', ')}`);

      if (hints.length > 0) {
        print(`    [${q.type} - ${hints.join(', ')}]`, 'dim');
      } else {
        print(`    [${q.type}${q.required ? ' - required' : ''}]`, 'dim');
      }
    }

    // Get answer
    const answer = await question(`${colors.green}You: ${colors.reset}`);
    console.log('');

    // Store response
    if (answer.trim()) {
      // Convert based on type
      switch (q.type) {
        case 'number':
        case 'currency':
          responses[q.field] = parseFloat(answer) || answer;
          break;
        case 'boolean':
          responses[q.field] = answer.toLowerCase().includes('yes') || answer.toLowerCase().includes('true');
          break;
        default:
          responses[q.field] = answer;
      }
    }

    // Check follow-up conditions (simplified)
    if (q.follow_up && q.follow_up.question_id) {
      // Find and ask follow-up question if needed
      const followUpQ = questions.find(fq => fq.id === q.follow_up.question_id);
      if (followUpQ && q.follow_up.condition) {
        // Simple condition evaluation
        const value = responses[q.field];
        const shouldAsk = eval(q.follow_up.condition.replace('value', value));

        if (shouldAsk) {
          print('AI: ' + followUpQ.question, 'cyan');
          const followAnswer = await question(`${colors.green}You: ${colors.reset}`);
          console.log('');
          responses[followUpQ.field] = followAnswer;
        }
      }
    }
  }

  rl.close();

  // Calculate qualification
  printHeader('Calculating Qualification...');
  console.log('');

  print('Collected Information:', 'bright');
  Object.keys(responses).forEach(key => {
    console.log(`  ${key}: ${responses[key]}`);
  });
  console.log('');

  // Run qualification
  const result = calculateQualification(config, responses);

  // Display results
  printHeader('Qualification Result');
  console.log('');

  if (result.autoDisqualified) {
    error(`❌ Auto-Disqualified`);
    console.log(`   Reason: ${result.autoDisqualifyReason}`);
    console.log('');

    if (config.conversation_flow.closing && config.conversation_flow.closing.unqualified) {
      print('AI Agent Closing:', 'cyan');
      let closing = config.conversation_flow.closing.unqualified;
      Object.keys(responses).forEach(key => {
        closing = closing.replace(`{{${key}}}`, responses[key]);
      });
      console.log(`  "${closing}"`);
    }
  } else {
    console.log(`  Score: ${result.score}/${result.maxScore} (${result.percentage.toFixed(1)}%)`);
    console.log(`  Threshold: 70%`);
    console.log('');

    if (result.qualified) {
      success('✅ QUALIFIED - Lead meets requirements!');
    } else {
      error('❌ NOT QUALIFIED - Below threshold');
    }
    console.log('');

    // Show criteria breakdown
    if (result.metCriteria.length > 0) {
      print('Met Criteria:', 'green');
      result.metCriteria.forEach(c => {
        console.log(`  ✓ ${c.field} ${c.operator} ${c.value} (weight: ${c.weight})`);
      });
      console.log('');
    }

    if (result.failedCriteria.length > 0) {
      print('Failed Criteria:', 'red');
      result.failedCriteria.forEach(c => {
        console.log(`  ✗ ${c.field} ${c.operator} ${c.value} (weight: ${c.weight})`);
        console.log(`    Your answer: ${c.actualValue}`);
      });
      console.log('');
    }

    // Show appropriate closing
    if (config.conversation_flow.closing) {
      print('AI Agent Closing:', 'cyan');
      let closing = result.qualified
        ? config.conversation_flow.closing.qualified
        : config.conversation_flow.closing.unqualified;

      if (closing) {
        Object.keys(responses).forEach(key => {
          closing = closing.replace(`{{${key}}}`, responses[key]);
        });
        closing = closing.replace('{{assigned_rep_name}}', 'Alex Johnson');
        closing = closing.replace('{{follow_up_months}}', '2');
        console.log(`  "${closing}"`);
      }
    }
  }

  console.log('');

  // CRM action preview
  printHeader('CRM Actions');
  const action = result.qualified ? config.integration.crm.actions.qualified : config.integration.crm.actions.unqualified;

  if (action) {
    console.log(`  Create Lead: ${action.create_lead ? '✓' : '✗'}`);
    if (action.assign_to) console.log(`  Assign To: ${action.assign_to}`);
    if (action.tags) console.log(`  Tags: ${action.tags.join(', ')}`);
    if (action.send_notification) console.log(`  Notify Sales Team: ✓`);
    if (action.add_to_nurture) console.log(`  Add to Nurture Campaign: ✓`);
  }

  console.log('');
}

/**
 * Main function
 */
async function main() {
  // Show usage if no arguments
  if (args.length === 0) {
    showUsage();
    process.exit(0);
  }

  // Validate schema file provided
  if (!schemaFile) {
    error('No schema file specified');
    showUsage();
    process.exit(1);
  }

  printHeader('Voice Agent Schema Validator');

  // Load schema
  info(`Loading schema: ${schemaFile}`);
  const config = loadJSON(schemaFile);
  if (!config) {
    process.exit(1);
  }
  success('Schema loaded successfully');
  console.log('');

  // Display basic info
  if (options.verbose || options.debug) {
    print('Schema Information:', 'bright');
    console.log(`  Name: ${config.agent_name || 'N/A'}`);
    console.log(`  Version: ${config.version || 'N/A'}`);
    console.log(`  Description: ${config.description || 'N/A'}`);
    console.log('');
  }

  // Validate schema structure
  printHeader('Schema Validation');
  const validation = validateSchema(config);

  if (validation.errors.length > 0) {
    error(`Found ${validation.errors.length} error(s):`);
    validation.errors.forEach(err => {
      console.log(`  • ${err}`);
    });
    console.log('');
    process.exit(1);
  } else {
    success('Schema structure is valid');
  }

  if (validation.warnings.length > 0) {
    warning(`Found ${validation.warnings.length} warning(s):`);
    validation.warnings.forEach(warn => {
      console.log(`  • ${warn}`);
    });
  }
  console.log('');

  // Run interactive mode if specified
  if (options.interactive) {
    await runInteractive(config);
    return;
  }

  // Run tests if specified
  if (options.payload) {
    // Single test
    printHeader('Running Test Scenario');
    const testPayload = loadJSON(options.payload);
    if (!testPayload) {
      process.exit(1);
    }

    const testName = testPayload.scenario_name || path.basename(options.payload);
    runTest(config, testPayload, testName);

  } else if (options.all) {
    // Run all tests
    const testDir = 'test-payloads';

    if (!fs.existsSync(testDir)) {
      warning(`Test directory '${testDir}/' not found`);
      info('Create test-payloads/ directory and add test JSON files');
      process.exit(0);
    }

    const testFiles = fs.readdirSync(testDir)
      .filter(f => f.endsWith('.json'))
      .sort();

    if (testFiles.length === 0) {
      warning(`No test files found in ${testDir}/`);
      process.exit(0);
    }

    printHeader(`Running ${testFiles.length} Test Scenario(s)`);

    let totalTests = 0;
    let passedTests = 0;

    testFiles.forEach(file => {
      const testPayload = loadJSON(path.join(testDir, file));
      if (!testPayload) {
        return;
      }

      const testName = testPayload.scenario_name || file;
      const { passed } = runTest(config, testPayload, testName);

      totalTests++;
      if (passed) {
        passedTests++;
      }
    });

    // Summary
    printHeader('Test Summary');
    console.log(`  Total Tests: ${totalTests}`);
    print(`  Passed: ${passedTests}`, passedTests === totalTests ? 'green' : 'yellow');
    if (totalTests - passedTests > 0) {
      print(`  Failed: ${totalTests - passedTests}`, 'red');
    }
    console.log('');

    if (passedTests === totalTests) {
      success('All tests passed!');
    } else {
      error(`${totalTests - passedTests} test(s) failed`);
      process.exit(1);
    }

  } else {
    // Just validation, no tests
    success('Schema validation complete!');
    info('Use --payload <file> to run a test scenario');
    info('Use --all to run all tests in test-payloads/');
    info('Use --interactive to simulate a live call');
    console.log('');
  }
}

// Run main function
main();
