// Premade login accounts
const users = [
  { username: "user", password: "pass" },
  { username: "user2", password: "pass2" },
  { username: "user3", password: "pass3" },
  { username: "admin", password: "admin" },
  { username: "Rigbty", password: "DmtDrone12" },
];

// Handle login
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      const matched = users.find(user => user.username === username && user.password === password);

      if (matched) {
        // Save current user (if you wanna use later, like show their name)
        localStorage.setItem("username", username);

        // Redirect to home
        window.location.href = "home.html";
      } else {
        alert("❌ Invalid username or password.");
      }
    });
  }
});

// Logout function
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const mainContent = document.getElementById('main-content');

// Start with sidebar open on desktop, closed on mobile
function setInitialSidebarState() {
  if (window.innerWidth < 768) {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    mainContent.classList.remove('ml-64');
  } else {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.add('hidden');
    mainContent.classList.add('ml-64');
  }
}

setInitialSidebarState();

window.addEventListener('resize', () => {
  setInitialSidebarState();
});

function openSidebar() {
  sidebar.classList.remove('-translate-x-full');
  if (window.innerWidth < 768) {
    overlay.classList.remove('hidden');
  }
  mainContent.classList.add('ml-64');
}

function closeSidebar() {
  sidebar.classList.add('-translate-x-full');
  overlay.classList.add('hidden');
  if (window.innerWidth >= 768) {
    mainContent.classList.remove('ml-64');
  }
}

menuBtn.addEventListener('click', () => {
  if (sidebar.classList.contains('-translate-x-full')) {
    openSidebar();
  } else {
    closeSidebar();
  }
});

overlay.addEventListener('click', closeSidebar);
