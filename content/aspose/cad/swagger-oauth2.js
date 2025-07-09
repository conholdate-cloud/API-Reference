document.addEventListener(
    'DOMContentLoaded', 
    function load() {
        if (!window.ui) {
            return setTimeout(load, 150);
        }
    
        // Replace the standard implementation of authorizeApplication in actions.js with a modified version that adds the 
        // client ID and client secret.
        // Based on code taken from $\swagger-ui\src\core\plugins\auth\actions.js
        ui.authActions.authorizeApplication = function (auth) {
    
            const { schema, scopes, name, clientId, clientSecret } = auth;
            const headers = { Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret)
            };
            const form = {
                grant_type: 'client_credentials',
                scope: scopes.join(' ')
            };
            if (clientId) {
                form.client_id = clientId;
            }
            if (clientSecret) {
                form.client_secret = clientSecret;
            }
    
            return ui.authActions.authorizeRequest({ body: buildFormData(form), name, url: schema.get('tokenUrl'), auth, headers });
        }
    }, 
false);

// No changes here, just the easiest way of using it.
// Taken from $\swagger-ui\src\core\utils.js
const buildFormData = function (data) {
    let formArr = []

    for (let name in data) {
        let val = data[name]
        if (val !== undefined && val !== '') {
            formArr.push([name, '=', encodeURIComponent(val).replace(/%20/g, '+')].join(''))
        }
    }
    return formArr.join('&')
}