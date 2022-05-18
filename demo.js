const arr = [1, 5, 3, 2, 9]

function sortToDead(arr) {
  Promise.all(arr).then((value) => {
    for (const item of value) {
      const tmp = []
      setTimeout(() => {
        console.log(item, 'check')
        tmp.push(item)
      }, item)
      console.log(tmp)
    }
  })
  // for (const item of arr) {
  //   const promise1 = item
  // }
}

sortToDead(arr)
