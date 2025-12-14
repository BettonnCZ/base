import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <header class="site-header">
    <h1>Hello</h1>
    <div class="actions">
      <button id="save-btn" class="btn">Save</button>
      <button id="load-btn" class="btn">Load</button>
      <button id="export-btn" class="btn">Export JSON</button>
    </div>
  </header>

  <main class="container">
    <section class="left">
      <label class="label">Title</label>
      <input class="textbox" placeholder="Add your title here" />

      <label class="label">Summary</label>
      <textarea class="textbox large" placeholder="Add a short summary..."></textarea>

      <label class="label">Details</label>
      <textarea class="textbox" placeholder="Add more details here..."></textarea>
    </section>

    <aside class="right">
      <div class="images-grid">
        <div class="image-window" data-index="1"><span>Image 1</span></div>
        <div class="image-window" data-index="2"><span>Image 2</span></div>
        <div class="image-window" data-index="3"><span>Image 3</span></div>
      </div>
      <p class="hint">Tip: double-click an image window to upload</p>
    </aside>
  </main>

  <footer class="site-footer">Made with neon glow ✦</footer>
`

// Image replacement via double-click + hidden file input
const fileInput = document.createElement('input')
fileInput.type = 'file'
fileInput.accept = 'image/*'
fileInput.style.display = 'none'
document.body.appendChild(fileInput)

document.querySelectorAll('.image-window').forEach(win => {
  win.addEventListener('dblclick', () => {
    fileInput.dataset.target = win.dataset.index
    fileInput.click()
  })
})

fileInput.addEventListener('change', (e) => {
  const file = e.target.files && e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const dataUrl = reader.result
    const idx = fileInput.dataset.target
    const target = document.querySelector(`.image-window[data-index="${idx}"]`)
    if (target) {
      target.style.backgroundImage = `url(${dataUrl})`
      target.dataset.src = dataUrl
      target.classList.add('has-image')
      target.querySelector('span').textContent = ''
    }
  }
  reader.readAsDataURL(file)
  fileInput.value = ''
})

// Allow placeholder click to highlight
document.querySelectorAll('.textbox').forEach(t => {
  t.addEventListener('focus', () => t.classList.add('focused'))
  t.addEventListener('blur', () => t.classList.remove('focused'))
})

// Small accessibility: allow keyboard double-enter to trigger file input
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && document.activeElement.classList.contains('image-window')) {
    e.preventDefault()
    const win = document.activeElement
    fileInput.dataset.target = win.dataset.index
    fileInput.click()
  }
})

// Save/Load functionality
const saveBtn = document.getElementById('save-btn')
const loadBtn = document.getElementById('load-btn')
const exportBtn = document.getElementById('export-btn')

function saveData() {
  const data = {
    title: document.querySelector('input.textbox').value,
    summary: document.querySelector('textarea.large').value,
    details: document.querySelector('textarea:not(.large)').value,
    images: Array.from(document.querySelectorAll('.image-window')).map(win => ({
      index: win.dataset.index,
      src: win.dataset.src || '',
      hasImage: win.classList.contains('has-image')
    }))
  }
  localStorage.setItem('siteData', JSON.stringify(data))
  alert('Data saved!')
}

function loadData() {
  const dataStr = localStorage.getItem('siteData')
  if (!dataStr) {
    alert('No saved data found.')
    return
  }
  const data = JSON.parse(dataStr)
  document.querySelector('input.textbox').value = data.title || ''
  document.querySelector('textarea.large').value = data.summary || ''
  document.querySelector('textarea:not(.large)').value = data.details || ''
  data.images.forEach(img => {
    const win = document.querySelector(`.image-window[data-index="${img.index}"]`)
    if (win && img.src) {
      win.style.backgroundImage = `url(${img.src})`
      win.dataset.src = img.src
      win.classList.add('has-image')
      win.querySelector('span').textContent = ''
    }
  })
  alert('Data loaded!')
}

function exportData() {
  const data = {
    title: document.querySelector('input.textbox').value,
    summary: document.querySelector('textarea.large').value,
    details: document.querySelector('textarea:not(.large)').value,
    images: Array.from(document.querySelectorAll('.image-window')).map(win => ({
      index: win.dataset.index,
      src: win.dataset.src || '',
      hasImage: win.classList.contains('has-image')
    }))
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'site-data.json'
  a.click()
  URL.revokeObjectURL(url)
}

saveBtn.addEventListener('click', saveData)
loadBtn.addEventListener('click', loadData)
exportBtn.addEventListener('click', exportData)

// Load on page load
loadData()