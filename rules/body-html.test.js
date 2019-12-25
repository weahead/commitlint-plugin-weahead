const parse = require('@commitlint/parse').default;

const check = require('./body-html');

const messages = {
  html: 'test: subject\n\nbody <em>has</em> html\n\nfooter',
  noHtml: 'test: subject\n\nbody does not have html\n\nfooter',
  greater: 'test: subject\n\nbody > something\n\nfooter',
  lesser: 'test: subject\n\nbody < something\n\nfooter',
};

const parsed = {
  html: parse(messages.html),
  noHtml: parse(messages.noHtml),
  greater: parse(messages.greater),
  lesser: parse(messages.lesser),
};

describe('when body should contain HTML', () => {
  it('should succeed with HTML', async () => {
    const [actual] = check(await parsed.html, 'always');
    const expected = true;
    expect(expected).toBe(actual);
  });

  it('should fail without HTML', async () => {
    const [actual] = check(await parsed.noHtml, 'always');
    const expected = false;
    expect(expected).toBe(actual);
  });

  it('should succeed with angle bracket greater', async () => {
    const [actual] = check(await parsed.greater, 'always');
    const expected = false;
    expect(expected).toBe(actual);
  });

  it('should succeed with angle bracket lesser', async () => {
    const [actual] = check(await parsed.lesser, 'always');
    const expected = false;
    expect(expected).toBe(actual);
  });
});

describe('when body should not contain HTML', () => {
  it('should fail with HTML', async () => {
    const [actual] = check(await parsed.html, 'never');
    const expected = false;
    expect(expected).toBe(actual);
  });

  it('should succeed without HTML', async () => {
    const [actual] = check(await parsed.noHtml, 'never');
    const expected = true;
    expect(expected).toBe(actual);
  });

  it('should succeed with angle bracket greater', async () => {
    const [actual] = check(await parsed.greater, 'never');
    const expected = true;
    expect(expected).toBe(actual);
  });

  it('should succeed with angle bracket lesser', async () => {
    const [actual] = check(await parsed.lesser, 'never');
    const expected = true;
    expect(expected).toBe(actual);
  });
});
