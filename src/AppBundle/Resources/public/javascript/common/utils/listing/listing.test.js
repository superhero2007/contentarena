import { validateEmail } from ".";

test("validateEmail: Email is validated", () => {
	expect(validateEmail('sokal1@gmail.com')).toBe(true);
	expect(validateEmail('wrong')).toBe(false);
});

test("validateEmail: Email is validated", () => {
	expect(validateEmail('sokal1@gmail.com')).toBe(true);
	expect(validateEmail('wrong')).toBe(false);
});
