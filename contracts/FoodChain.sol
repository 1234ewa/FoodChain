// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FoodChain {
    address public owner;
    address public treasuryWallet = 0xCc7266d0526f129dCe4c0BD24b1D32860e432b8A;
    uint256 public constant PAYMENT_AMOUNT = 0.1 ether; // 0.1 MON
    
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        bool available;
    }
    
    struct Transaction {
        uint256 id;
        address buyer;
        uint256 productId;
        uint256 amount;
        uint256 timestamp;
        bool completed;
    }
    
    mapping(uint256 => Product) public products;
    mapping(uint256 => Transaction) public transactions;
    mapping(address => uint256[]) public userTransactions;
    
    uint256 public productCount;
    uint256 public transactionCount;
    
    event ProductAdded(uint256 indexed productId, string name, uint256 price);
    event PurchaseCompleted(uint256 indexed transactionId, address indexed buyer, uint256 productId, uint256 amount);
    event PaymentReceived(address indexed from, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        _initializeProducts();
    }
    
    function _initializeProducts() private {
        // Inicializar productos con precios en wei (0.1 MON = 0.1 ether)
        _addProduct("Manzanas Rojas", 0.1 ether);
        _addProduct("Plátanos", 0.1 ether);
        _addProduct("Tomates Orgánicos", 0.1 ether);
        _addProduct("Lechuga Romana", 0.1 ether);
        _addProduct("Fresas Orgánicas", 0.1 ether);
        _addProduct("Zanahorias", 0.1 ether);
        _addProduct("Uvas Frescas", 0.1 ether);
        _addProduct("Aguacate", 0.1 ether);
        _addProduct("Papaya", 0.1 ether);
        _addProduct("Piña", 0.1 ether);
        _addProduct("Brócoli", 0.1 ether);
        _addProduct("Papas", 0.1 ether);
        _addProduct("Elote", 0.1 ether);
    }
    
    function _addProduct(string memory name, uint256 price) private {
        productCount++;
        products[productCount] = Product(productCount, name, price, true);
        emit ProductAdded(productCount, name, price);
    }
    
    function purchaseProduct(uint256 productId) external payable {
        require(productId > 0 && productId <= productCount, "Invalid product ID");
        require(products[productId].available, "Product not available");
        require(msg.value == PAYMENT_AMOUNT, "Incorrect payment amount");
        
        // Crear transacción
        transactionCount++;
        Transaction memory newTransaction = Transaction({
            id: transactionCount,
            buyer: msg.sender,
            productId: productId,
            amount: msg.value,
            timestamp: block.timestamp,
            completed: true
        });
        
        transactions[transactionCount] = newTransaction;
        userTransactions[msg.sender].push(transactionCount);
        
        // Transferir fondos al treasury
        (bool success, ) = treasuryWallet.call{value: msg.value}("");
        require(success, "Transfer to treasury failed");
        
        emit PurchaseCompleted(transactionCount, msg.sender, productId, msg.value);
        emit PaymentReceived(msg.sender, msg.value);
    }
    
    function getProduct(uint256 productId) external view returns (Product memory) {
        require(productId > 0 && productId <= productCount, "Invalid product ID");
        return products[productId];
    }
    
    function getTransaction(uint256 transactionId) external view returns (Transaction memory) {
        require(transactionId > 0 && transactionId <= transactionCount, "Invalid transaction ID");
        return transactions[transactionId];
    }
    
    function getUserTransactions(address user) external view returns (uint256[] memory) {
        return userTransactions[user];
    }
    
    function getProductCount() external view returns (uint256) {
        return productCount;
    }
    
    function getTransactionCount() external view returns (uint256) {
        return transactionCount;
    }
    
    // Función para que el owner pueda retirar fondos (en caso de emergencia)
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    // Función para recibir pagos
    receive() external payable {
        emit PaymentReceived(msg.sender, msg.value);
    }
}
