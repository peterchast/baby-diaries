/*
  lib/TrelloApi.js
*/

import fetch from 'node-fetch';

export default class TrelloApi {

  // These are "private" variables, meaning that they can be accessed only
  // inside this class. Their values are set in the constructor when this
  // class is instantiated by "new TrelloApi(key, token)". (see index.js)
  #key;
  #token;

  constructor(key, token) {
    this.#key = key;
    this.#token = token;
  }

  // This should be a private method but that isn't supported until ES2020
  createListUrl(boardId) {
    return `https://api.trello.com/1/boards/${boardId}/cards?fields=due,desc,idList&attachments=true&attachment_fields=url&key=${this.#key}&token=${this.#token}`;
  }

  async fetchCards(boardId) {
    const listUrl = this.createListUrl(boardId);
    const response = await fetch(listUrl);
    const cards = response.json();
    return cards;
  }

  async fetchImage(imageUrl) {
    const response = await fetch(imageUrl, {
      "headers": {
        "Authorization": `OAuth oauth_consumer_key="${this.#key}", oauth_token="${this.#token}"`
      }
    });
    const buffer = await response.buffer();
    return buffer;
  }

}