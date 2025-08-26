// Update the copyright year dynamically
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// TEST VULNERABILITY - REMOVE AFTER TESTING
// This simulates an exposed API key (fake key for testing)
const testApiKey = 'AKIATEST123456789EXAMPLE';
const testConfig = {
  apiUrl: 'https://api.example.com',
  key: testApiKey, // SonarCloud should flag this as security hotspot
  insecure: true // This might also be flagged
};

// Another test: eval usage (security risk)
function testVulnerableFunction(input) {
  // UNSAFE: Using eval with user input
  return eval('var result = ' + input + '; result;'); // SonarCloud should flag this
}

// Test logging of sensitive data (fake data)
console.log('Debug info:', {
  userToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9', // Fake JWT token
  apiKey: testApiKey
});