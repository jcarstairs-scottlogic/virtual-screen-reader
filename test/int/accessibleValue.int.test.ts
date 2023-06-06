import { virtual } from "../../src";

describe("Placeholder Attribute Property", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should announce a non-empty value on a text input", async () => {
    document.body.innerHTML = `
    <div id="label">Label</div>
    <input type="text" aria-labelledby="label" id="search1" value="a11y"/>
    `;

    await virtual.start({ container: document.body });
    await virtual.next();
    await virtual.next();

    expect(await virtual.lastSpokenPhrase()).toBe("textbox, Label, a11y");

    await virtual.stop();
  });

  it("should not announce an empty value on a text input", async () => {
    document.body.innerHTML = `
    <div id="label">Label</div>
    <input type="text" aria-labelledby="label" id="search1" value=""/>
    `;

    await virtual.start({ container: document.body });
    await virtual.next();
    await virtual.next();

    expect(await virtual.lastSpokenPhrase()).toBe("textbox, Label");

    await virtual.stop();
  });

  it("should not announce a missing value on a text input", async () => {
    document.body.innerHTML = `
    <div id="label">Label</div>
    <input type="text" aria-labelledby="label" id="search1"/>
    `;

    await virtual.start({ container: document.body });
    await virtual.next();
    await virtual.next();

    expect(await virtual.lastSpokenPhrase()).toBe("textbox, Label");

    await virtual.stop();
  });

  it("should not announce a value on a checkbox input", async () => {
    document.body.innerHTML = `
    <div id="label">Label</div>
    <input type="checkbox" aria-labelledby="label" id="check1" value="forbidden"/>
    `;

    await virtual.start({ container: document.body });
    await virtual.next();
    await virtual.next();

    expect(await virtual.lastSpokenPhrase()).toBe("checkbox, Label");

    await virtual.stop();
  });

  it("should not announce a value on a radio input", async () => {
    document.body.innerHTML = `
    <div id="label">Label</div>
    <input type="radio" aria-labelledby="label" id="radio1" value="forbidden"/>
    `;

    await virtual.start({ container: document.body });
    await virtual.next();
    await virtual.next();

    expect(await virtual.lastSpokenPhrase()).toBe("radio, Label");

    await virtual.stop();
  });

  it("should not announce a value on a radio input", async () => {
    document.body.innerHTML = `
    <div id="label">Label</div>
    <input type="radio" aria-labelledby="label" id="radio1" value="forbidden"/>
    `;

    await virtual.start({ container: document.body });
    await virtual.next();
    await virtual.next();

    expect(await virtual.lastSpokenPhrase()).toBe("radio, Label");

    await virtual.stop();
  });

  it("should announce the selected value in a select with options", async () => {
    document.body.innerHTML = `
    <select>
      <option value="first">First Value</option>
      <option value="second" selected>Second Value</option>
      <option value="third">Third Value</option>
    </select>
    `;

    await virtual.start({ container: document.body });
    await virtual.next();

    expect(await virtual.lastSpokenPhrase()).toBe(
      "combobox, second, not expanded, has popup listbox"
    );

    await virtual.stop();
  });

  it("should announce the multiple selected values in a multi-select with options", async () => {
    document.body.innerHTML = `
    <select multiple>
      <option value="first">First Value</option>
      <option value="second" selected>Second Value</option>
      <option value="third" selected>Third Value</option>
    </select>
    `;

    await virtual.start({ container: document.body });
    await virtual.next();

    expect(await virtual.lastSpokenPhrase()).toBe(
      "listbox, second; third, orientated vertically"
    );

    await virtual.stop();
  });

  it("should not announce empty selected values in a select with options", async () => {
    document.body.innerHTML = `
    <select>
      <option value="" disabled selected>- Select some value - </option>
      <option value="first">First Value</option>
      <option value="second">Second Value</option>
      <option value="third">Third Value</option>
    </select>
    `;

    await virtual.start({ container: document.body });
    await virtual.next();

    expect(await virtual.lastSpokenPhrase()).toBe(
      "combobox, not expanded, has popup listbox"
    );

    await virtual.stop();
  });
});
