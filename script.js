window.solve = async () => {
  const a = +document.getElementById('a').value
  const b = +document.getElementById('b').value
  const x1 = document.getElementById('x1')
  const x2 = document.getElementById('x2')
  const err = document.getElementById('err')
  err.innerText = ''
  x1.innerText = ''
  x2.innerText = ''
  const res = await fetch('/solve', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({a, b})
  })
  if (res.ok) {
    const [v1, v2] = await res.json()
    x1.innerText = v1
    x2.innerText = v2
    return
  }
  err.innerText = await res.text()
}
