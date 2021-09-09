function test(name, testFunction) {
  try {
    testFunction();
    console.log(`✓ ${name}`);
  } catch (e) {
    console.log(`✕ ${name}`);
    console.log(e);
  }
}

function expect(received) {
  return {
    toBe(expected) {
      if (received !== expected) {
        throw Error(`
        Received: ${received}
        Expected: ${expected}
        `);
      }
    },
  };
}

global.test = test;
global.expect = expect;
