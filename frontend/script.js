document.addEventListener('DOMContentLoaded', () => {
    //variables
    let user = null;
    let account = null;

    //Pantallas
    const loginScreen = document.getElementById('loginScreen');
    const dashboardScreen = document.getElementById('dashboardScreen');

    //Formulario login
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    //Dashboard
    const welcomeMessage = document.getElementById('welcomeMessage');
    const logoutBtn = document.getElementById('logoutBtn');
    const balanceAmount = document.querySelector('.balance-amount');
    const accountNumber = document.querySelector('.account-number');

    //Botones del Dashboard
    const depositBtn = document.getElementById('depositBtn');
    const withdrawBtn = document.getElementById('withdrawBtn');
    const transferBtn = document.getElementById('transferBtn');
    const movementsBtn = document.getElementById('movementsBtn');
    
    //Formulario de Depósito
    const deposit = document.getElementById('deposit');
    const depositForm = document.getElementById('depositForm');
    const accountToTransfer = document.getElementById('transferAccount');
    const depositAmount = document.getElementById('depositAmount');
    const depositDescription = document.getElementById('depositDescription');
    const btnCancelDeposit = document.getElementById('cancelDepositBtn');
    
    //Formulario de Retiro
    const withdraw = document.getElementById('withdraw');
    const withdrawForm = document.getElementById('withdrawForm');
    const withdrawAmount = document.getElementById('withdrawAmount');
    const withdrawDescription = document.getElementById('withdrawDescription');
    const btnCancelWithdraw = document.getElementById('cancelWithdrawBtn');
    
    //Formulario de Transferencia
    const cbuJuan= document.getElementById('cbuJuan');
    const cbuPedro= document.getElementById('cbuPedro');
    const cbuMaria= document.getElementById('cbuMaria');
    const cbuCarla= document.getElementById('cbuCarla');

    const transfer = document.getElementById('transfer');
    const transferForm = document.getElementById('transferForm');
    const transferTo = document.getElementById('transferTo');
    const transferAmount = document.getElementById('transferAmount');
    const tranferErrorContainer = document.getElementById('transferErrorContainer');
    const transferError = document.getElementById('transferError');
    const transferDescription = document.getElementById('transferDescription');
    const btnCancelTransfer = document.getElementById('cancelTransferBtn');
    
    //Formulario de Movimientos
    const movements = document.getElementById('movementsView');
    const movementsList = document.getElementById('movementsList');
    const btnCancelMovements = document.getElementById('cancelMovementsBtn');
    
    //Eventos
    loginForm.addEventListener('submit', login);
    logoutBtn.addEventListener('click', logout);

    depositBtn.addEventListener('click',() => {
        deposit.style.display = 'block';
        withdraw.style.display = 'none';
        transfer.style.display = 'none';
        movements.style.display = 'none';
    }
    );
    withdrawBtn.addEventListener('click',() => {
        deposit.style.display = 'none';
        withdraw.style.display = 'block';
        transfer.style.display = 'none';
        movements.style.display = 'none';
    }
    );
    transferBtn.addEventListener('click',() => {
        deposit.style.display = 'none';
        withdraw.style.display = 'none';
        transfer.style.display = 'block';
        movements.style.display = 'none';
        showCbus();
    }
    );

    document.addEventListener('click', function(event) {
        if(event.target.classList.contains('btn-copy')) {
            let cbu = event.target.getAttribute('data-cbu');
            let userToTransfer = event.target.getAttribute('data-user');
            accountToTransfer.value = cbu;
            transferDescription.value = "Transferencia a " + userToTransfer; ;
        }   
    });

    movementsBtn.addEventListener('click',() => {
        deposit.style.display = 'none';
        withdraw.style.display = 'none';
        transfer.style.display = 'none';
        movements.style.display = 'block';
        showMovements();}
    );

    depositForm.addEventListener('submit', async(event) => {
        event.preventDefault();
        await depositMoney(account._id, depositAmount.value);
        account = await findAccountByUserId(user._id);
        await createBankRegister(account._id, new Date(), depositDescription.value, "DEPOSITO", depositAmount.value);
        balanceAmount.textContent = account.balance;
        depositForm.reset();
        deposit.style.display = 'none';
    });

    withdrawForm.addEventListener('submit', async(event) => {
        event.preventDefault();
        await withdrawMoney(account._id, withdrawAmount.value);
        account = await findAccountByUserId(user._id);
        await createBankRegister(account._id, new Date(), withdrawDescription.value, "RETIRO", withdrawAmount.value);
        balanceAmount.textContent = account.balance;
        withdrawForm.reset();
        withdraw.style.display = 'none';
    });

    transferForm.addEventListener('submit', async(event) => {
        event.preventDefault();
        const isValid = await validateTransfer(account._id, accountToTransfer.value, transferAmount.value);
        console.log(isValid);
        if(isValid==false) return;
        await executetransfer(event);
        account = await findAccountByUserId(user._id);
        balanceAmount.textContent = account.balance;
        transferForm.reset();
        transfer.style.display = 'none';
    });
    

    function logout() {
        user = null;
        account = null;
        loginScreen.style.display = 'flex';
        dashboardScreen.style.display = 'none';
    }

    async function login(event) {
        event.preventDefault();
        username = usernameInput.value;
        user = await findUserByUsername(username);
        account = await findAccountByUserId(user._id);
        console.log(user);
        console.log(account);

        if (user && account) {
            loginScreen.style.display = 'none';
            dashboardScreen.style.display = 'block';
            welcomeMessage.textContent = `Bienvenido, ${user.name}`;
            balanceAmount.textContent = account.balance;
            accountNumber.textContent = "Cbu: " + account._id;
        }
    }

    async function findUserByUsername(username) {
        try {
            const response = await fetch(`http://localhost:3000/user/${username}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function findAccountByUserId(userId) {
        try {
            const response = await fetch(`http://localhost:3000/bank-account/${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function depositMoney(accountId, amount){
        try {
            const response = await fetch(`http://localhost:3000/bank-account/deposit/${accountId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function withdrawMoney(accountId, amount){
        try {
            const response = await fetch(`http://localhost:3000/bank-account/withdraw/${accountId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function createBankRegister( bankAccountId, date, description, operation, amount) {
        try {
            const response = await fetch('http://localhost:3000/bank-register/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    "bankAccountId": bankAccountId,
                    "date": date,
                    "description": description,
                    "amount": Number(amount),
                    "operation": operation
                })
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    function showCbus(){
        document.querySelectorAll('[id^="cbu"]').forEach(cbu => {
            if(cbu.id === ("cbu" + user.name)){
                cbu.style.display = 'none';
            }else{
                cbu.style.display = 'block';
            }
        })
    }

    async function executetransfer(event) {
        event.preventDefault();
        try {
            await withdrawMoney(account._id, transferAmount.value);
            await createBankRegister(account._id, new Date(), transferDescription.value, "TRANSFERENCIA_ENVIADA", transferAmount.value);
            await depositMoney(accountToTransfer.value, transferAmount.value);
            await createBankRegister(accountToTransfer.value, new Date(), "Transferencia de " + user.name, "TRANSFERENCIA_RECIBIDA", transferAmount.value);
        } catch (error) {
            console.log(error);
        }
    }

    async function findUserByAccount(accountId) {
        try {
            const response = await fetch(`http://localhost:3000/bank-account/findUser/${accountId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
        
    }

    async function validateTransfer(accountId, cbu, amount){
        if(accountId === cbu){
            transferError.textContent = "no puedes transferir a ti mismo";
            tranferErrorContainer.style.display = 'block';
            return false;
        }else if(amount <= 0){
            transferError.textContent = "el monto debe ser mayor a 0";
            tranferErrorContainer.style.display = 'block';
            return false;
        }else if(account.balance < amount){
            transferError.textContent = "fondos insuficientes";
            tranferErrorContainer.style.display = 'block';
            return false;
        }else if(await existAccount(cbu)!== true){
            transferError.textContent = "la cuenta no existe";
            tranferErrorContainer.style.display = 'block';
            return false;
        }else{
            tranferErrorContainer.style.display = 'none';
            return true;
        }
    }

    async function existAccount(cbu){
        try {
            const response = await fetch(`http://localhost:3000/bank-account/exist/${cbu}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }


    async function showMovements() {
        try {
            const registers = await findMovementsByAccountId(account._id);
            console.log(registers);
            movementsList.innerHTML = '';
            registers.forEach(register => {
                const div = document.createElement('div');
                div.classList.add('movement-item');
                div.innerHTML = `
                    <span>${new Date(register.date).toLocaleString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</span>
                    <span>${register.description}</span>
                    `;
                if(register.operation === "DEPOSITO" || register.operation === "TRANSFERENCIA_RECIBIDA"){
                    div.innerHTML += `<span class="amount positive">+$${register.amount}</span>`;
                    div.innerHTML += `<span>${register.operation.startsWith("TRANSFERENCIA") ? "TRANSFERENCIA" : register.operation}</span>`;
                }else{
                    div.innerHTML += `<span class="amount negative">-$${register.amount}</span>`;
                    div.innerHTML += `<span>${register.operation.startsWith("TRANSFERENCIA") ? "TRANSFERENCIA" : register.operation}</span>`;
                }
                movementsList.appendChild(div);
            });
        } catch (error) {
            console.log(error);
        }
        
    }

    async function findMovementsByAccountId(accountId){
        try {
            const response = await fetch(`http://localhost:3000/bank-register/find/${accountId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
});