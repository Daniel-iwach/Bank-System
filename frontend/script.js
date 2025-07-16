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
    const depositAmount = document.getElementById('depositAmount');
    const depositDescription = document.getElementById('depositDescription');
    const btnCancelDeposit = document.getElementById('cancelDepositBtn');
    
    //Formulario de Retiro
    const withdraw = document.getElementById('withdraw');
    const withdrawForm = document.getElementById('withdrawForm');
    const withdrawAmount = document.getElementById('withdrawAmount');
    const btnCancelWithdraw = document.getElementById('cancelWithdrawBtn');
    
    //Formulario de Transferencia
    const transfer = document.getElementById('transfer');
    const transferFrom = document.getElementById('transferFrom');
    const transferTo = document.getElementById('transferTo');
    const transferAmount = document.getElementById('transferAmount');
    const btnCancelTransfer = document.getElementById('cancelTransferBtn');
    
    //Formulario de Movimientos
    const movements = document.getElementById('movementsView');
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
    }
    );
    movementsBtn.addEventListener('click',() => {
        deposit.style.display = 'none';
        withdraw.style.display = 'none';
        transfer.style.display = 'none';
        movements.style.display = 'block';}
    );

    depositForm.addEventListener('submit', async(event) => {
        event.preventDefault();
        await depositMoney(user._id, depositAmount.value);
        account = await findAccountByUserId(user._id);
        await createBankRegister(account._id, new Date(), depositDescription.value, "DEPOSITO", depositAmount.value);
        balanceAmount.textContent = account.balance;
        depositForm.reset();
        deposit.style.display = 'none';
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

    async function depositMoney(userId, amount){
        try {
            const response = await fetch(`http://localhost:3000/bank-account/deposit/${userId}`, {
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
});