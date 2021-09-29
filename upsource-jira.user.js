// ==UserScript==
// @name         UpSource JIRA integration
// @namespace    UpSource JIRA integration
// @version      0.1
// @description  try to take over the world!
// @author       jh
// @match        https://upsource.plus4u.net/upsource/*/review/*
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @connect      jira.unicorn.com
// ==/UserScript==

window.onload = (function() {
    'use strict';

    const jiraUrl = 'https://jira.unicorn.com';
    const jiraBrowseIssue = jiraUrl + "/browse";
    const jiraIssueKeyPattern = /([A-Z]+-\d+)/;

    function globalJiraIssueKeyRegex() {
        return new RegExp(jiraIssueKeyPattern, "g");
    }

    function getTitle() {
        return document.querySelector('span.review-view__title');
    }

    function getJiraIssueKeyFromTitle() {
        const match = getTitle().innerText.match(globalJiraIssueKeyRegex());
        return match ? match[0] : '';
    }


    /**
     *
     * @param {HTMLElement} element The element whose text content with JIRA issue code will be replaced with JIRA issue link.
     */
    function replaceIssueByLink(element) {
        debugger;
        if (!element) {
            console.error('Cannot replace element text with jira link, element is ', element);
            return;
        }
        element.innerHTML = element.innerHTML
            .replace(globalJiraIssueKeyRegex(), `<a href="${jiraBrowseIssue}/$1" target="_blank">$1</a>`);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Activates all the enhancments.
     */
    async function enhanceMergeReviewPage() {
        await sleep(5000);
        replaceIssueByLink(getTitle());
    }

    enhanceMergeReviewPage();
})();
