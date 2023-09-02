// This is your test publishable API key.
const stripe = Stripe("pk_test_51NjrKtCjxGdIbKBpDvn3CdL0nqVjZwsUMb87Gykh1rz4f8A1jJaw3IZEFX5yykF1EP11pnSbuWDIocIeEyf0NSib001SgXYrXB");

// The items the customer wants to buy
const items = [{ id: "xl-tshirt" }];

let elements;

initialize();

document
    .querySelector("#payment-form")
    .addEventListener("submit", handleSubmit);

let emailAddress = '';

// Fetches a payment intent and captures the client secret
async function initialize() {
    const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
    });
    const { payload } = await response.json();
    if (!payload) {
        Swal.fire({
            icon: "error",
            title: "No se pudo realizar el pago",
            text: `${error.message}`,
        }).then(() => {
            window.location.href = "/products";
        });
    }
    const { client_secret: clientSecret } = payload;
    const appearance = {
        theme: 'night'
    }
    elements = stripe.elements({ appearance, clientSecret, locale: 'en' })
    const linkAuthenticationElement = elements.create('linkAuthentication')
    linkAuthenticationElement.mount('#link-authentication-element')

    linkAuthenticationElement.on('change', (event) => {
        emailAddress = event.value.email
    })

    const paymentElementOptions = {
        layout: 'tabs'
    }

    const paymentElement = elements.create('payment', paymentElementOptions)
    paymentElement.mount('#payment-element')
}

async function handleSubmit(e) {

    e.preventDefault();
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
            receipt_email: emailAddress,
        },
    });
    if (error?.type === "card_error" || error?.type === "validation_error")
        Swal.fire({
            icon: "error",
            title: "No se pudo realizar el pago",
            text: `${error.message}`,
        }).then(() => {
            window.location.href = "/products";
        });

    setLoading(false);
    Swal.fire({
        icon: "success",
        title: "Pago realizado con éxito",
    });

    generateTicket(paymentIntent.amount);
}

async function generateTicket(amount) {
    const cid = document.getElementById("cid").innerText;
    const response = await fetch(`./api/carts/${cid}/purchase`, {
        method: "GET",
    })
    const result = await response.json();
    const { payload } = result;
    if (result.status === "success") {
        window.location.href = `/ticket/${payload._id}`;
    } else {
        Swal.fire({
            icon: "error",
            title: "No se pudo generar el ticket",
            text: `${result.message}`,
        });
    }
}

// Show a spinner on payment submission
function setLoading(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#payment-submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("#payment-submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
}

