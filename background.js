
const rule_com = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'github.com', schemes: ['https'] },
    }),
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

const rule_dev = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'github.dev', schemes: ['https'] },
    }),
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

chrome.runtime.onInstalled.addListener(async () => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule_com, rule_dev]);
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  const COM = 'https://github.com';
  const DEV = 'https://github.dev';

  const url = tab.url ?? '';
  if (url.startsWith(COM)) {
    await chrome.tabs.create({ url: url.replace(COM, DEV)});
  }
  if (url.startsWith(DEV)) {
    await chrome.tabs.create({ url: url.replace(DEV, COM)});
  }
});
