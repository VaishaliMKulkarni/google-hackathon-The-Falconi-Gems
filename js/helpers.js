function buildPreferences(pref1, pref2, pref3, pref4)
{
    return pref1 + pref2 + pref3 + pref4;
}

function removeAsterisksAndNewlines(inputString) {
    // Remove asterisks
    const withoutAsterisks = inputString.replace(/\*/g, '');
  
    // Remove newlines
    const withoutNewlines = withoutAsterisks.replace(/[\r\n]/g, '');
  
    return withoutNewlines;
  }
  
  function imageToHTMLImg(imageUrl)
  {
    return '<img src="' + imageUrl + '" width="100%" />'
  }