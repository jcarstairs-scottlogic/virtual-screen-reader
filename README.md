# Virtual Screen Reader

<a href="https://www.npmjs.com/package/@guidepup/virtual-screen-reader"><img alt="Virtual Screen Reader available on NPM" src="https://img.shields.io/npm/v/@guidepup/virtual-screen-reader" /></a>
<a href="https://github.com/guidepup/virtual-screen-reader/actions/workflows/test.yml"><img alt="Virtual Screen Reader test workflows" src="https://github.com/guidepup/virtual-screen-reader/workflows/Test/badge.svg" /></a>
<a href="https://github.com/guidepup/virtual-screen-reader/blob/main/LICENSE"><img alt="Virtual Screen Reader uses the MIT license" src="https://img.shields.io/github/license/guidepup/virtual-screen-reader" /></a>

## [Documentation](https://guidepup.dev) | [API Reference](https://www.guidepup.dev/docs/api/class-guidepup-virtual-screen-reader)

Virtual Screen Reader is a screen reader simulator for unit tests.

This package aims to supplement your testing by enabling you to automate a Virtual Screen Reader for unit test workflows the same as you would for mouse or keyboard based scenarios.

> [!IMPORTANT]
> This package should not replace but augment your screen reader testing, there is no substitute for testing with real screen readers and with real users.

If you are looking to automate real screen readers, check out the [`@guidepup/guidepup`](https://github.com/guidepup/guidepup) package.

If you are looking to for quick and easy Jest snapshot testing, check out the [`@guidepup/jest`](https://github.com/guidepup/jest) package.

## Capabilities

- **Mirrors Screen Reader Functionality** - simulate and assert on what users can do when using screen readers.
- **Test Framework Agnostic** - run with Jest, with Playwright, as an independent script, no vendor lock-in.
- **UI Framework Agnostic** - want to use React, Vue, Solid, Svelte, etc.? All good here! Works with any UI framework, and plays nicely with the [Testing Library](https://testing-library.com/) suite.
- **Fast Feedback** - avoid the cumbersome overhead of running an e2e test with a real screen reader by running virtually over the provided DOM.

## Principles

There is currently no explicit specification for screen readers to adhere to, but there are a number of requirements laid out by specifications to inform screen reader expectations. This library aims to meet these requirements so that it can be as "spec compliant" as possible.

Current W3C specifications used:

- [Accessible Rich Internet Applications (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [Accessible Name and Description Computation (ACCNAME) 1.2](https://www.w3.org/TR/accname-1.2/)
- [ARIA in HTML (HTML-ARIA)](https://www.w3.org/TR/html-aria/)
- [HTML Accessibility API Mappings (HTML-AAM) 1.0](https://www.w3.org/TR/html-aam-1.0/)

Extracted requirements from these specifications can be found in [docs/requirements.md](docs/requirements.md). If a requirement is not met, [please raise an issue](https://github.com/guidepup/virtual-screen-reader/issues).

In addition to the W3C specifications, <https://a11ysupport.io/> as been used as a guide for test cases in the absence of anything formal. In future we hope to adopt test cases laid out by the [ARIA and Assistive Technologies (ARIA-AT) community group](https://github.com/w3c/aria-at).

>[!NOTE]
> This library should not used as a substitute for testing with real screen readers and with real screen reader users, but a means to gain quick coverage and confidence by automating away common scenarios the same as any other unit test.

## Getting Started

Install Virtual Screen Reader to your project:

```bash
npm install --save-dev @guidepup/virtual-screen-reader
```

And get cracking with your first screen reader unit test automation code!

## Examples

Head over to the [Guidepup Website](https://www.guidepup.dev/) for guides, real world examples, and complete API documentation with examples.

Some examples can also be found in the [examples section](./examples).

You can also check out this project's own [integration tests](https://github.com/guidepup/virtual-screen-reader/tree/main/src/test) to learn how you could use the Virtual Screen Reader in your projects.

### Basic Navigation

```ts
import { virtual } from "@guidepup/virtual-screen-reader";

function setupBasicPage() {
  document.body.innerHTML = `
  <nav>Nav Text</nav>
  <section>
    <h1>Section Heading</h1>
    <p>Section Text</p>
    <article>
      <header>
        <h1>Article Header Heading</h1>
        <p>Article Header Text</p>
      </header>
      <p>Article Text</p>
    </article> 
  </section>
  <footer>Footer</footer>
  `;
}

describe("Screen Reader Tests", () => {
  test("should traverse the page announcing the expected roles and content", async () => {
    // Setup a page using a framework and testing library of your choice
    setupBasicPage();

    // Start your Virtual Screen Reader instance
    await virtual.start({ container: document.body });

    // Navigate your environment with the Virtual Screen Reader similar to how your users would
    while ((await virtual.lastSpokenPhrase()) !== "end of document") {
      await virtual.next();
    }

    // Assert on the kind of things your users would see and hear when using screen readers
    expect(await virtual.spokenPhraseLog()).toEqual([
      "document",
      "navigation",
      "Nav Text",
      "end of navigation",
      "region",
      "heading, Section Heading, level 1",
      "Section Text",
      "article",
      "banner",
      "heading, Article Header Heading, level 1",
      "Article Header Text",
      "end of banner",
      "Article Text",
      "end of article",
      "end of region",
      "contentinfo",
      "Footer",
      "end of contentinfo",
      "end of document",
    ]);

    // Stop your Virtual Screen Reader instance
    await virtual.stop();
  });
});
```

## Powerful Tooling

Check out some of the other Guidepup modules:

- [`@guidepup/guidepup`](https://github.com/guidepup/guidepup) - Reliable automation for your screen reader a11y workflows through JavaScript supporting VoiceOver and NVDA.
- [`@guidepup/setup`](https://github.com/guidepup/setup) - Set up your local or CI environment for screen reader test automation.
- [`@guidepup/playwright`](https://github.com/guidepup/guidepup-playwright) - Seemless integration of Guidepup with Playwright.
- [`@guidepup/jest`](https://github.com/guidepup/jest) - Jest matchers for reliable unit testing of your screen reader a11y workflows.

## Similar

Here are some similar unaffiliated projects:

- [`@testing-library/dom`](https://github.com/testing-library/dom-testing-library/)
- [`aria-query`](https://github.com/A11yance/aria-query)
- [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api)
- [`aria-at`](https://github.com/w3c/aria-at)

## Resources

- [Documentation](https://www.guidepup.dev/docs/virtual)
- [API Reference](https://www.guidepup.dev/docs/api/class-guidepup-virtual-screen-reader)
- [Contributing](.github/CONTRIBUTING.md)
- [Changelog](https://github.com/guidepup/virtual-screen-reader/releases)
- [MIT License](https://github.com/guidepup/virtual-screen-reader/blob/main/LICENSE)
