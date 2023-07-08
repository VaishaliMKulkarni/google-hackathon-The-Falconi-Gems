(async function() {
    // Project ID for this request.
    const project = 'gen-the-falconi-gems';
  
    // The name of the zone for this request.
    const zone = 'us-central1-a';
  
    // Service Account Credentials, JSON format
    const jsonFilename = 'service_account_key.json';
  
    // Permissions to request for Access Token
    const scopes = 'https://www.googleapis.com/auth/cloud-platform';
  
    // Set how long this token will be valid in seconds
    const expiresIn = 3600; // Expires in 1 hour
  
    function loadJsonCredentials(filename) {
      /* Load the Google Service Account Credentials from JSON file */
      return fetch(filename)
        .then(response => response.json());
    }
  
    function pemToUint8Array(pemString) {
      const pemHeader = '-----BEGIN PRIVATE KEY-----';
      const pemFooter = '-----END PRIVATE KEY-----';
      const pemContents = pemString
        .replace(pemHeader, '')
        .replace(pemFooter, '')
        .replace(/\n/g, '');
  
      const binaryString = window.atob(pemContents);
      const uint8Array = new Uint8Array(binaryString.length);
  
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }
  
      return uint8Array;
    }
  
    async function createSignedJwt(pemKey, pkeyId, email, scope) {
      //alert('pemkey:' + pemKey);
      /* Create a Signed JWT from a service account JSON credentials file
         This Signed JWT will later be exchanged for an Access Token */
  
      const privateKey = pemToUint8Array(pemKey);
  
      const issued = Math.floor(Date.now() / 1000);
      const expires = issued + expiresIn;
  
      // JWT Headers
      const additionalHeaders = {
        kid: pkeyId,
        alg: 'RS256',
        typ: 'JWT', // Google uses SHA256withRSA
      };
  
      // JWT Payload
      const payload = {
        iss: email, // Issuer claim
        sub: email, // Issuer claim
        aud: 'https://www.googleapis.com/oauth2/v4/token', // Audience claim
        iat: issued, // Issued At claim
        exp: expires, // Expire time
        scope: scope, // Permissions
      };
      alert(JSON.stringify(payload));
      // Encode the headers and payload
      console.log('additionalHeaders: ' + JSON.stringify(additionalHeaders))
      console.log('payload:'  + JSON.stringify(payload));
      const encodedHeader = encodeURIComponent(JSON.stringify(additionalHeaders));
      const encodedPayload = encodeURIComponent(JSON.stringify(payload));
      console.log('encodedHeader: ' + encodedHeader);
      console.log('encodedPayload: ' + encodedPayload);
  
      // Create the signing input by concatenating the encoded header and payload
      const signingInput = `${encodedHeader}.${encodedPayload}`;
  
      const privateKeyObj = {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      };
  
      const cryptoKey = await window.crypto.subtle.importKey(
        'pkcs8',
        privateKey,
        privateKeyObj,
        false,
        ['sign']
      );
  
      const signature = await window.crypto.subtle.sign(
        'RSASSA-PKCS1-v1_5',
        cryptoKey,
        new TextEncoder().encode(signingInput)
      );
    
      const signatureBuffer = new Uint8Array(signature);
  
      const base64UrlSignature = Array.from(signatureBuffer)
        .map(byte => String.fromCharCode(byte))
        .join('')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
      // JWT = base64UrlEncodedHeader + "." + base64UrlEncodedPayload + "." + base64UrlSignature
      const jwt = `${signingInput}.${base64UrlSignature}`;
      //console.log(jwt);
      return jwt;
    }
  
    function exchangeJwtForAccessToken(signedJwt) {
        /* This function takes a Signed JWT and exchanges it for a Google OAuth Access Token */
        const authUrl = 'https://www.googleapis.com/oauth2/v4/token';
      
        const data = new URLSearchParams();
        data.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
        data.append('assertion', signedJwt);
      
        return fetch(authUrl, {
          method: 'POST',
          body: data,
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to exchange JWT for Access Token');
            }
          })
          .then(result => result.access_token)
          .catch(error => {
            // Log the detailed error information
            console.error('Error:', error);
            throw error; // Rethrow the error to propagate it further
          });
      }
  
    try {
      const cred = await loadJsonCredentials(jsonFilename);
      const privateKey = cred.private_key;
      const signedJwt = await createSignedJwt(
        privateKey,
        cred.private_key_id,
        cred.client_email,
        scopes
      );
      alert('signedJwt: ' + signedJwt);
      const accessToken = await exchangeJwtForAccessToken(signedJwt);
  
      // Continue with the rest of the code
      const instances = await gceListInstances(accessToken);
      console.log(`Compute instances in zone ${zone}`);
      console.log('------------------------------------------------------------');
      for (const item of instances.items) {
        console.log(item.name);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  })();
  