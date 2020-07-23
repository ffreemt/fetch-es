function scramble(s1, s2) {
  //let s1, s2;
  //s1 = 'katas'
  //s2 = 'steak'
  let arr2 = Array.from(new Set(s2));

  let c1, c2;

  for (let i = 0; i < arr2.length; i++) {
    c1 = 0;
    c2 = 0;
    for (let idx = 0; idx < s1.length; idx++) {
      if (s1[idx] === arr2[i]) c1++;
    }
    for (let idx = 0; idx < s1.length; idx++) {
      if (s1[idx] === arr2[i]) c2++;
    }
    if (c2 > c1 ) return false;
  }

  return true;
}