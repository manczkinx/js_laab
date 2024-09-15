document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('noteForm');
    const searchForm = document.getElementById('searchForm');
    const searchQuery = document.getElementById('searchQuery');
    const notesContainer = document.getElementById('notesContainer');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        addNote();
    });

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        renderNotes(searchQuery.value.toLowerCase());
    });

    function addNote() {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const color = document.getElementById('color').value;
        const pin = document.getElementById('pin').checked;
        const tags = document.getElementById('tags').value
            ? document.getElementById('tags').value.split(',').map(tag => tag.trim())
            : [];
        const date = new Date().toLocaleString();

        const note = {
            title,
            content,
            color,
            pin,
            tags,
            date
        };

        saveNoteToLocalStorage(note);
        renderNotes();
        form.reset();
    }

    function saveNoteToLocalStorage(note) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function renderNotes(query = '') {
        notesContainer.innerHTML = '';
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        notes = notes.filter(note => {
            return note.title.toLowerCase().includes(query) ||
                   note.content.toLowerCase().includes(query) ||
                   (note.tags && note.tags.some(tag => tag.toLowerCase().includes(query)));
        });

        notes.sort((a, b) => b.pin - a.pin);

        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.style.backgroundColor = note.color;
            noteElement.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <div class="tags">Tagi: ${note.tags ? note.tags.join(', ') : ''}</div>
                <div class="date">Utworzono: ${note.date}</div>
            `;
            notesContainer.appendChild(noteElement);
        });
    }

    renderNotes();
});
