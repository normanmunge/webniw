import { WebniwPage } from './app.po';

describe('webniw App', function() {
  let page: WebniwPage;

  beforeEach(() => {
    page = new WebniwPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
