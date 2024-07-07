document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-query').value.toLowerCase();
    const articles = document.querySelectorAll('article');

    articles.forEach(article => {
        const title = article.querySelector('h2').innerText.toLowerCase();
        const content = article.querySelector('p').innerText.toLowerCase();
        if (title.includes(query) || content.includes(query)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (email === '' || message === '') {
        alert('Por favor, preencha todos os campos.');
    } else if (!validateEmail(email)) {
        alert('Por favor, insira um endereço de email válido.');
    } else {
        alert('Obrigado por seu feedback! Entraremos em contato em breve.');
        // Limpar o formulário após o envio
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const commentText = document.getElementById('comment-text').value.trim();

    if (commentText !== '') {
        const commentList = document.getElementById('comment-list');
        const commentItem = document.createElement('li');
        commentItem.innerText = commentText;
        commentList.appendChild(commentItem);

        document.getElementById('comment-text').value = '';
    } else {
        alert('Por favor, preencha o campo de comentário.');
    }
});
// Função para enviar e-mail de notificação
function sendEmailNotification(commentText) {
    emailjs.send("your_service_id", "your_template_id", {
        message: commentText,
        to_email: "your_email@example.com"
    })
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
}

// Adicionando a função de notificação ao evento de envio de comentário
document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const commentText = document.getElementById('comment-text').value.trim();

    if (commentText !== '') {
        const commentList = document.getElementById('comment-list');
        const commentItem = document.createElement('li');
        commentItem.innerText = commentText;
        commentList.appendChild(commentItem);

        sendEmailNotification(commentText);  // Enviar notificação por e-mail

        document.getElementById('comment-text').value = '';
    } else {
        alert('Por favor, preencha o campo de comentário.');
    }
});
