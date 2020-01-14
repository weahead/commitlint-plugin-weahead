const parse = require('@commitlint/parse').default;

const check = require('./header-html');

const messages = {
  subjectHtml: 'test: subject <em>has</em> html\n\nbody\n\nfooter',
  typeHtml: '<p>test</p>: subject\n\nbody\n\nfooter',
  noHtml: 'test: subject no html\n\nbody\n\nfooter',
  subjectGreater: 'test: subject > something\n\nbody\n\nfooter',
  typeGreater: 'test>something: subject\n\nbody\n\nfooter',
  subjectLesser: 'test: subject < something\n\nbody\n\nfooter',
  typeLesser: 'test<something: subject\n\nbody\n\nfooter',
};

const parsed = {
  subjectHtml: parse(messages.subjectHtml),
  typeHtml: parse(messages.typeHtml),
  noHtml: parse(messages.noHtml),
  subjectGreater: parse(messages.subjectGreater),
  typeGreater: parse(messages.typeGreater),
  subjectLesser: parse(messages.subjectLesser),
  typeLesser: parse(messages.typeLesser),
};

describe('when header should contain HTML', () => {
  it('should succeed with HTML in subject', async () => {
    const [actual] = check(await parsed.subjectHtml, 'always');
    const expected = true;
    expect(expected).toBe(actual);
  });

  it('should succeed with HTML in type', async () => {
    const [actual] = check(await parsed.typeHtml, 'always');
    const expected = true;
    expect(expected).toBe(actual);
  });

  it('should fail without HTML', async () => {
    const [actual] = check(await parsed.noHtml, 'always');
    const expected = false;
    expect(expected).toBe(actual);
  });

  it('should succeed with angle bracket greater in subject', async () => {
    const [actual] = check(await parsed.subjectGreater, 'always');
    const expected = false;
    expect(expected).toBe(actual);
  });

  it('should succeed with angle bracket greater in type', async () => {
    const [actual] = check(await parsed.typeGreater, 'always');
    const expected = false;
    expect(expected).toBe(actual);
  });

  it('should succeed with angle bracket lesser in subject', async () => {
    const [actual] = check(await parsed.subjectLesser, 'always');
    const expected = false;
    expect(expected).toBe(actual);
  });

  it('should succeed with angle bracket lesser in type', async () => {
    const [actual] = check(await parsed.typeLesser, 'always');
    const expected = false;
    expect(expected).toBe(actual);
  });
});

describe('when header should not contain HTML', () => {
  it('should fail with HTML in subject', async () => {
    const [actual] = check(await parsed.subjectHtml, 'never');
    const expected = false;
    expect(expected).toBe(actual);
  });

  it('should fail with HTML in type', async () => {
    const [actual] = check(await parsed.typeHtml, 'never');
    const expected = false;
    expect(expected).toBe(actual);
  });

  it('should succeed without HTML', async () => {
    const [actual] = check(await parsed.noHtml, 'never');
    const expected = true;
    expect(expected).toBe(actual);
  });

  it('should succeed with angle bracket greater in subject', async () => {
    const [actual] = check(await parsed.subjectGreater, 'never');
    const expected = true;
    expect(expected).toBe(actual);
  });

  it('should succeed with angle bracket greater in type', async () => {
    const [actual] = check(await parsed.typeGreater, 'never');
    const expected = true;
    expect(expected).toBe(actual);
  });

  it('should succeed with angle bracket lesser in subject', async () => {
    const [actual] = check(await parsed.subjectLesser, 'never');
    const expected = true;
    expect(expected).toBe(actual);
  });

  it('should succeed with angle bracket lesser in type', async () => {
    const [actual] = check(await parsed.typeLesser, 'never');
    const expected = true;
    expect(expected).toBe(actual);
  });
});
