  // Call the function to create the signed JWT
  const signedJwt = createSignedJwt();
  console.log('signedJwt=' + signedJwt);

  function createSignedJwt() {
    const privateKey = "-----BEGIN PRIVATE KEY-----MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQC4+BpQ0naRtob18Dtj5tY2dfUgqpCxqa1EIpnS6gTr9E/cYIj4ZNagaI0g4aM3jI7ef9fmYhqy97wG5lLEm8ruJkarI2R6JK7pgo/9aet+s8gQ+uGwa4AiAw6dNV6ZGus3EjP75KErISn5VSgOR7emUQXNP1lXutf36LUs9lhWKUfKpupo+NLwkSlclhlPwRt9qOAoeHgDbzjZYYoQitI8kMl8CRosESNXpcBLN4m6oTUL2gib4cEgFa+Rzw5WhgIKmhg/3az3OC2dEwnLn6zgSabfZC7ElSneMbGi2Sw6hw95YszPxppMfy1AzoCFWZk+1UW9pVemt/J/vDLkdTAgMBAAECggEAJwYUHAheqEbR6kwBsYuMuC4OJNYZw82eZu5rnqyqI03CGOnVLKPnWDwMD7v/AzEmdeISQv1joOsgVAErc/TTu/2934IX/ZCAQ7fveLlMg6cSC95Vl53gK8HSUfp6NsJCHlfwX+FEC1boag/fDYO51+OEc4ZGB+nLMicZEH8vAealnCyvyE9iZpOiR7LU1QtpLa1tzaqzMhBR05zirP+g0A6oXJsl7E08Sm5v9Hpd/3+NcSHuEYprLSoMeDUUQttHB6PpnCwl6k626YK2oYN2eWxb6Ht44q822TLlx1u+CQkDp08eEgaYT6KjHikQSGAOa9b+nKAmt3K8rYfCGf+D8QKBgQDnFJoXOV+E//W9gtGJ+t9Xbu1irwRqxjzZ8RHsO0y+oXN0j0g56NnDAUwZN6Q0tAIBbIcgbmxS7kdm+70aYsGokWRL0fof36ESu4QCrzctl3KWD61mDpKaSL1w9vWUzUDZYWj0Wram5FKWlThnRD3DY+fetpmCV4YuArB566NmOQKBgQDmewbU/nEyXp33LB4IjRWuxpjVJMQo2+3WgNqzwkAn0O6bxHq6AQme10Yqv9Pq32PukS8235i/1zJsLVjyYCr/qIX8zoXt7GyOdrWJHL+IabZTTm98BZ4FFAtoc8mFfgn9TllQBILdwJGhaFmPfmynvqY80E5XlXdfJ4iyA9L56wKBgQCYxcYaFJRSGecdo59k2bdO1seatpr0/Jq+e+Kdi5bxcUwjg5b8sjVF91WYVnD5ZwjsaBPuHRMAwQfzzfr3ttLR302v0uLKr86N0+sy2yRfwADBtRuunXPPDMgyJxO1jP2SuhPpeQ/IxqrTY1Qm8bbjtulVFOPoiHTtdlm2QVOGAQKBgFmP9zCvi1dSczoIl8ck5Acdv2gcOGnURND1E4eE9Z9DTmWTbUl4e7+Q0gBsuLHtiwy6uEkvjFEIE9z7pjPRcQQV/bMmod6539lggdy9IiSlR6eJtELSf/xjNKerTuUj/EfFuWkhx6TaXv0E6sCbFSf+KuU44SihuVhtqW3blJFvAoGBALtvfL8UaFDUrcnHHJaBhkoZyhPsRAr08j7kV/XktlISBtgxnWpllWnsuuakFEN+eh83BDVusB4RBbRnqkOxBTiUCmQHDolpkaYDmTpwV3JJQYmUqJ6OYSgm91oHCoIvr42ftyiTRyoWOJqXPaXZ2Yl3U6HgjtMmXR/VD+8HMSS6-----END PRIVATE KEY-----";
    const privateKeyId = '4c2012cf908504776e8862093be2215b9ba6c0a2';
    const email = 'the-falconi-gems@gen-the-falconi-gems.iam.gserviceaccount.com';
    const scope = 'https://www.googleapis.com/auth/cloud-platform';
  
    const issued = Math.floor(Date.now() / 1000);
    const expires = issued + 3600; // Expires in 1 hour
  
    // JWT Headers
    const header = {
      alg: 'RS256',
      typ: 'JWT',
      kid: privateKeyId,
    };
  
    // JWT Payload
    const payload = {
      iss: email,
      sub: email,
      aud: 'https://www.googleapis.com/oauth2/v4/token',
      iat: issued,
      exp: expires,
      scope: scope,
    };
  
    // Encode the header and payload
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    
    // Create the signing input by concatenating the encoded header and payload
    //const signingInput = `${encodedHeader}.${encodedPayload}`;
    const signingInput = `${encodedPayload}`;

    // Create the signature using the private key
    const signature = signJwt(signingInput, privateKey);
    const encodedSignature = base64UrlEncode(signature);
    console.log('sig: ' + encodedSignature);

    // Create the final JWT by concatenating the encoded header, payload, and signature
    const jwt = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;

    return jwt;
  }
  
// Function to sign the JWT using the private key
function signJwt(signingInput, privateKey) {
    const rsaPrivateKey = KEYUTIL.getKey(privateKey);
    const sig = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
    //sig.init(rsaPrivateKey);
    sig.init(privateKey);
    sig.updateString(signingInput);
    const signature = sig.sign();
    return signature;
  }



  // Function to base64 URL encode a string
  /*function base64UrlEncode(str) {
    const utf8Bytes = encodeURIComponent(str)
      .replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1))
      .split('')
      .map(c => c.charCodeAt(0));
    const base64 = btoa(String.fromCharCode.apply(null, utf8Bytes));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }*/

  function base64UrlEncode(str) {
    const utf8Bytes = encodeURIComponent(str);
    const base64 = btoa(utf8Bytes);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
