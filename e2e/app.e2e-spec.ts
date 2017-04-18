import { JiraClient2Page } from './app.po';

describe('jira-client2 App', () => {
  let page: JiraClient2Page;

  beforeEach(() => {
    page = new JiraClient2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
