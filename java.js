
/*================================ toggle icon navbar =================================*/
document.addEventListener("DOMContentLoaded", () => {
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    
    if (menuIcon && navbar) { 
        menuIcon.onclick = () => {
            console.log("Menu icon clicked!"); // Check if click event is working
            menuIcon.classList.toggle('fa-xmark');  
            navbar.classList.toggle('active');  
        };
    } else {
        console.error("Error: #menu-icon or .navbar element not found!");
    }
});

window.onscroll = () => {
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Ensure menuIcon exists before using it
    if (menuIcon) {
        menuIcon.classList.remove('fa-xmark');
    }
    if (navbar) {
        navbar.classList.remove('active');
    }
};

function debounce(func, delay) {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };
}

window.addEventListener("scroll", debounce(() => {
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
    if (menuIcon) menuIcon.classList.remove('fa-xmark');
    if (navbar) navbar.classList.remove('active');
}, 100)); // 100ms delay


/*================================ scroll section active link =================================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // Sabhi links se 'active' class remove karna
            navLinks.forEach(link => link.classList.remove('active'));

            // Sahi selector ka use karke active class add karna
            let activeLink = document.querySelector(`header nav a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    /*================================ sticky navbar =================================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*================================ remove toggle icon and navbar =================================*/
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

// ================================= scroll reveal ================================= //
setTimeout(() => {
    ScrollReveal({
        distance: '80px',
        duration: 1500,
        delay: 100,
    });

    ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right' });

    console.log("✅ ScrollReveal Loaded!");
}, 1000); // Delay 1 sec





document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Form ko default reload hone se rokta hai

    // Input values ko get karna
    let fullName = document.querySelector('input[placeholder="Full Name"]').value;
    let email = document.querySelector('input[placeholder="Email Address"]').value;
    let mobile = document.querySelector('input[placeholder="Mobile Number"]').value;
    let subject = document.querySelector('input[placeholder="Email Subject"]').value;
    let message = document.querySelector("textarea").value;

    // Validation Check
    if (!fullName || !email || !mobile || !subject || !message) {
        alert("Please fill all the fields.");
        return;
    }

    // Console par data print karna (Aap isko backend par bhej sakte hain)
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Mobile:", mobile);
    console.log("Subject:", subject);
    console.log("Message:", message);

    alert("Form submitted successfully!");

    // Form reset karna
    document.querySelector("form").reset();
});



(function () {
    emailjs.init("cIcts0QMI4d2-erSN"); // Yahan apna PUBLIC_KEY dalein (EmailJS Dashboard se)
})();

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Form ko reload hone se rokta hai

    // Form se values get karna
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    // Agar koi field empty hai toh alert show karein
    if (!fullName || !email || !mobile || !subject || !message) {
        alert("Please fill all the fields.");
        return;
    }

    // EmailJS Parameters
    let templateParams = {
        name: fullName,
        email: email,
        mobile: mobile,
        subject: subject,
        message: message,
    };

    // Email Send Karein
    emailjs.send("service_627krqe", "template_lv7x92x", templateParams)
        .then(function (response) {
            alert("Email Sent Successfully! ✅");
            document.getElementById("contact-form").reset(); // Form Reset Karein
        })
        .catch(function (error) {
            alert("Failed to send email. ❌ Please try again!");
            console.error("EmailJS Error:", error);
        });
});