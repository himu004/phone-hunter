const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones);
}

const displayPhone = phones => {
    // S-1 Get The Container where card belongs
    const phonContainer = document.getElementById('phone-container');

    // clear phone container cards before adding new cards
    phonContainer.textContent = '';
    // Display Show All button if there are more then 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 10) {
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // First 10 Phones
    phones = phones.slice(0, 10);

    phones.forEach(phone => {
        // S-2. Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card py-7 bg-gray-100 shadow-xl`;
        // S-3. Set Inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Phone" /></figure>
        <div class="card-body">
            <h2 class="card-title text-black">${phone.brand}</h2>
            <p class="text-black">${phone.phone_name}</p>
            <div class="card-actions pt-4">
            <button class="btn btn-accent w-full">Buy Now</button>
            </div>
        </div>
        `
        // S-4. Append Child to container
        phonContainer.appendChild(phoneCard);
    });
    // Hide Loading Spinner
    toggleLoadingSpinner(false);

}

// Hanlde Search Button

const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchFiled = document.getElementById('seaarch-field');
    const searchText = searchFiled.value;
    loadPhone(searchText);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// loadPhone();