'use strict';

const nock = require('nock');

class Search {

    static nockGitHub(params) {
        const {name, language, location} = params;
        let url = `/search/users?q=${name}+language:${language}+location:${location}`;

        return nock('http://api.github.com')
        .get(url)
        .reply(200, this.getGitResponse());
    }

    static getGitResponse() {
        return {
            'total_count': 2,
            'incomplete_results': false,
            'items': [
                {
                    'login': 'johnandblue',
                    'id': 21159524,
                    'node_id': 'MDQ6VXNlcjIxMTU5NTI0',
                    'avatar_url': 'https://avatars1.githubusercontent.com/u/21159524?v=4',
                    'gravatar_id': '',
                    'url': 'https://api.github.com/users/johnandblue',
                    'html_url': 'https://github.com/johnandblue',
                    'followers_url': 'https://api.github.com/users/johnandblue/followers',
                    'following_url': 'https://api.github.com/users/johnandblue/following{/other_user}',
                    'gists_url': 'https://api.github.com/users/johnandblue/gists{/gist_id}',
                    'starred_url': 'https://api.github.com/users/johnandblue/starred{/owner}{/repo}',
                    'subscriptions_url': 'https://api.github.com/users/johnandblue/subscriptions',
                    'organizations_url': 'https://api.github.com/users/johnandblue/orgs',
                    'repos_url': 'https://api.github.com/users/johnandblue/repos',
                    'events_url': 'https://api.github.com/users/johnandblue/events{/privacy}',
                    'received_events_url': 'https://api.github.com/users/johnandblue/received_events',
                    'type': 'User',
                    'site_admin': false,
                    'score': 35.032974
                },
                {
                    'login': 'juanpescador',
                    'id': 1808374,
                    'node_id': 'MDQ6VXNlcjE4MDgzNzQ=',
                    'avatar_url': 'https://avatars3.githubusercontent.com/u/1808374?v=4',
                    'gravatar_id': '',
                    'url': 'https://api.github.com/users/juanpescador',
                    'html_url': 'https://github.com/juanpescador',
                    'followers_url': 'https://api.github.com/users/juanpescador/followers',
                    'following_url': 'https://api.github.com/users/juanpescador/following{/other_user}',
                    'gists_url': 'https://api.github.com/users/juanpescador/gists{/gist_id}',
                    'starred_url': 'https://api.github.com/users/juanpescador/starred{/owner}{/repo}',
                    'subscriptions_url': 'https://api.github.com/users/juanpescador/subscriptions',
                    'organizations_url': 'https://api.github.com/users/juanpescador/orgs',
                    'repos_url': 'https://api.github.com/users/juanpescador/repos',
                    'events_url': 'https://api.github.com/users/juanpescador/events{/privacy}',
                    'received_events_url': 'https://api.github.com/users/juanpescador/received_events',
                    'type': 'User',
                    'site_admin': false,
                    'score': 25.349415
                }
            ]
        };
    }

    
}

module.exports = Search;
