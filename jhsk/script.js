function scrollToPage2() {
    document.getElementById('page2').scrollIntoView({ behavior: 'smooth' });
}

// Optional: Add functionality to the chatbot icon
document.getElementById('chatbot').addEventListener('click', function() {
    alert('Chatbot clicked!');
    // You can add more interactive functionality here
});

// const triggerDiv = document.getElementById("loginbtn");
//         const closeBtn = document.getElementById("closeModal");
//         const modal = document.getElementById("modal");

//         triggerDiv.addEventListener("click", () => {
//             modal.classList.add("open");
//         });

//         closeBtn.addEventListener("click", () => {
//             modal.classList.remove("open");
//         });

        const servDiv = document.getElementById("serv1");
        const closeBtn = document.getElementById("closeModal2");
        const modal = document.getElementById("modal2");

        servDiv.addEventListener("click", () => {
            modal.classList.add("open");
        });

        closeBtn.addEventListener("click", () => {
            modal.classList.remove("open");
        });