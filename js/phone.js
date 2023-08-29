const loadPhone = async (searchText = '13') => {
    
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones);
}

const displayPhone = (phones) => {
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

    // Display First 10 Phones if not show all
    
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
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-accent w-full">Show Details</button>
            </div>
        </div>
        `
        // S-4. Append Child to container
        phonContainer.appendChild(phoneCard);
    });
    // Hide Loading Spinner
    toggleLoadingSpinner(false);

}

// SHOW MOBILE DETAILS  

const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();

    const phone = data.data;
    showPhoneDetails(phone);


}
const showPhoneDetails = (phone) => {

    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

    const showDetails = document.getElementById('show-detail-container');
    showDetails.innerHTML = `
     <img src="${phone.image}"/>
     <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
     <p><span>Storage:</span>${phone?.mainFeatures?.displaySize}</p>
    `


    // Show Modal
    show_details_modal.showModal();
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

// Show All Button

const handleShowAll = () => {

    handleSearch();

}

loadPhone();