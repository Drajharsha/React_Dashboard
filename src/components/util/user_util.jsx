export function validatePassword(e) {
    let specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>?~]/;
    let value = e.currentTarget.value;
    let length = value.length;

    if (length < 7) {
        document.querySelector('.length').classList.remove('hidden-req')
    } else {
        document.querySelector('.length').classList.add('hidden-req')
    }

    let capitalized = value.split('').some(char => char === char.toUpperCase());
    if (!capitalized) {
        document.querySelector('.capital').classList.remove('hidden-req')
    } else {
        document.querySelector('.capital').classList.add('hidden-req')
    };

    let specialChar = specialChars.test(value);
    if (!specialChar) {
        document.querySelector('.special-char').classList.remove('hidden-req')
    } else {
        document.querySelector('.special-char').classList.add('hidden-req')
    };

    if (length && capitalized && specialChar) {
        document.querySelector('.password-req-container').classList.add('hidden');
        document.querySelector('.initial-password-checkmark').classList.remove('hidden');
        document.querySelector('.initial-password-checkmark').classList.add('verified');
    } else {
        document.querySelector('.password-req-container').classList.remove('hidden');
        document.querySelector('.initial-password-checkmark').classList.add('hidden');
        document.querySelector('.initial-password-checkmark').classList.remove('verified');
    }

    let secondPassCheckmark = document.querySelector('.confirm-password-checkmark');
    if (!secondPassCheckmark.classList.contains('hidden')) {
        if (e.currentTarget.value !== document.querySelector('.second-password').value) {
            console.log('first and second not the same')
            secondPassCheckmark.classList.add('hidden');
        }
    } else {
        if (e.currentTarget.value === document.querySelector('.second-password').value) {
            secondPassCheckmark.classList.remove('hidden');
        }
    }
}

export function togglePasswords() {
    let passwords = document.querySelectorAll('input');
    passwords.forEach(pw => pw.type = pw.type === "text" ? "password" : "text")
}

export function confirmPassword(e) {
    let firstPassword = document.querySelector('.first-password').value;
    if (firstPassword === "") return;
    if (firstPassword === e.currentTarget.value) {
        document.querySelector(".confirm-password-checkmark").classList.remove("hidden")
        document.querySelector(".confirm-password-checkmark").classList.add("verified")
    } else {
        document.querySelector(".confirm-password-checkmark").classList.add("hidden")
        document.querySelector(".confirm-password-checkmark").classList.remove("verified")
    }
}