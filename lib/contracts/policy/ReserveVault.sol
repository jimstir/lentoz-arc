// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
/// @title Tokenized Reserve
/// @author Jimmy Debe


import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";

contract ReserveVault is ERC4626 {
    using SafeMath for uint256;

    /// @dev proposals event
    event proposals(
        address indexed token,
        uint256 indexed proposalNum,
        uint256 indexed amount,
        address recipient
    );
    /// @dev owner deposit event
    event depositCom(
        address indexed token,
        uint256 indexed amount,
        uint256 indexed time,
        uint256 count
    );

    struct ownerAccount{
        //count => timestamp
        uint256 time;
        //count => token
        address token;
        // timestamp? count => amount
        uint256 deposit;
    }

    struct userAccount{
        //uint256 numOfProposals;
        //user => specifc numOfProposals by user => corensanding ProposalNum ex. 1st vote is proposal number 5, second vote is proposal number 7
        uint256 proposal;
        //user => proposalNum => amount
        uint256 deposit;
        uint256 withdrew;
    }

    struct proposalAccount{
        //proposalNum -> tokenAddress
        address token;
        //proposal => amount
        uint256 withdrew;
        uint256 received;
    }

    bool private _agent;
    address private _rOwner;
    address private _rAuth;
    //number of opened proposals
    uint256 private _proposalNum;
    // count of ownerDeposits
    uint256 private _ownerDeposits;

    mapping(address => bool) private _authUsers;
    mapping(uint256 => uint256) private _totalShares;
    mapping(uint256 => bool) private _closedProposals;

    //cause of doulble mapping, numOfProposal might not work***, keep value a uint256 (0)
    mapping(address => mapping(uint256 => userAccount)) internal userBook;
    mapping(uint256 => ownerAccount) internal ownerBook;
    mapping(uint256 => proposalAccount) internal proposalBook;
     
    constructor(bool agent, address owner, IERC20 token) ERC20("nKDe", "ticr") ERC4626(token){
         if(agent){
            _agent = true;
            _rAuth = msg.sender;
            _authUsers[msg.sender] = true;
            _rOwner = owner;
         }else{
             _agent = false;
             _rOwner = msg.sender;
             _authUsers[msg.sender] = true;
         }    
    }
    /**
    * @dev Primary authorized user modifier
    */
    modifier auth(){
        (_agent) ? require(msg.sender == _rAuth) : require(msg.sender == _rOwner);
        _;
    }
    /**
    * @dev Get the reserve owner
    * 
    */
    function whosOwner() public view returns (address){
        return _rOwner;
    }
    /**
    * @dev Get the reserve primary authorized user
    */
    function whosAuth() external view returns (address){
        return _rAuth;
    }
    /// @notice 
    /** @dev Check current total of opened proposals
    * @return uint256
    */ 
    function proposalCheck() public view returns (uint256) {
        return _proposalNum;
    }
    /**
    * @dev Authorized users of the reserve
    */
    function getAuth(address user) public view returns (bool){
        return _authUsers[user];
    }
    /** 
    * @dev Get number of deposits made to reserve by the owner
    * - MUST BE deposits made by calling depositReserve function
    */
    function accountCheck() public view returns (uint256){
        return _ownerDeposits;
    }
    /** 
    * @dev Get time of a deposit made to reserve by the owner
    * @param count Number matching deposit
    * @return block.timestamp format
    */
    function depositTime(uint256 count) external view returns (uint256){
        return ownerBook[count].time;
    }
    /** 
    * @dev Get amount deposited to reserve by the owner 
    * @param count Number of deposit
    * @return uint256 number of any asset that were deposited
    */
    function ownerDeposit(uint256 count) external view returns(uint256){
        return ownerBook[count].deposit;
    }
    /**
    * @dev Token type deposited to contract by the owner
    * @param count Number of deposit
    * - MUST be an address of ERC20 token
    */
    function tokenDeposit(uint256 count) external view returns(address){
        return ownerBook[count].token;
    }
    /**
    * @dev Amount deposited for share of proposal by the user
    * - MUST be an ERC20 address
    * @param user address of user
    * @param proposal number of the proposal the user deposited
    */
    function userDeposit(address user, uint256 proposal) public view returns(uint256){
        return userBook[user][proposal].deposit;
    }
    /**
    * @dev Amount withdrawn from given proposal by the user
    * @param user address of user
    * @param proposal number of the proposal the user withdrew
    */
    function userWithdrew(address user, uint256 proposal) public view returns(uint256){
        return userBook[user][proposal].withdrew;
    }
    /**
    * @dev The total number of proposals joined by the user
    * @param user address of user
    */
    function userNumOfProposal(address user) public view returns(uint256){
        return userBook[user][0].proposal;
    }
    /**
    * @dev The proposal number from the specific proposal joined by the user
    * @param user address of user
    * @param proposal the number the user was apart of
    * MUST NOT be zero
    */
    function userProposal(address user, uint256 proposal) public view returns(uint256){
        return userBook[user][proposal].proposal;
    }
    /**
    * @dev Token used for given proposal
    * - MUST be ERC20 address
    * @param proposal number for requested token
    * @return token address
    */
    function proposalToken(uint256 proposal) external view returns(address){
        return proposalBook[proposal].token;
    }
    /**
    * @dev Amount withdrawn for given proposal
    */
    function proposalWithdrew(uint256 proposal) external view returns(uint256){
        return proposalBook[proposal].withdrew;
    }
    /**
    * @dev Amount received for given proposal
    ** change neme
    */
    function proposalDeposit(uint256 proposal) external view returns(uint256){
        return proposalBook[proposal].received;
    }
    /**
    * @dev Total shares issued for a given proposal
    * NOTE: Number does not change after proposal closed and shares are redeemed
    */
    function totalShares(uint256 proposal) public view returns(uint256){
        return _totalShares[proposal];
    }
    /**
    * @dev Check if proposal is closed
    * @return true if closed
    */
    function closedProposal(uint256 proposal) public view returns(bool){
        return _closedProposals[proposal];
    }
    /**
    * @dev Add a new authorized user
    * MUST BE primary authorized user not owner if agent = true
    */
    function addAuth(address num) external auth virtual {
        _authUsers[num] = true;
    }
    /**
    * @dev SafeAdd function
    */
    function add(uint256 a, uint256 b) internal pure returns(uint256){
        (, uint256 c) = a.tryAdd(b);
        return c;
    }
    /**
    * @dev Make a deposit to proposal creating new shares
    * - MUST be open proposal
    * - MUST NOT be closed proposal
    * NOTE: using the deposit() will cause shares to not be accounted for in a proposal
    * @param assets amount being deposited
    * @param receiver address of depositor
    * @param proposal number assciated proposal
    */
    function proposalDeposit(uint256 assets, address receiver, uint256 proposal) public virtual returns (uint256) {
        require(!closedProposal(proposal));
        require(proposalCheck() >= proposal);

        uint256 shares = deposit(assets, receiver);
        _totalShares[proposal] = add(totalShares(proposal), shares);
        
        uint256 cc = userNumOfProposal(msg.sender) + 1;
        userBook[receiver][proposal].deposit = add(userDeposit(receiver, proposal), shares);
        userBook[msg.sender][0].proposal = cc;
        userBook[msg.sender][cc].proposal = proposal;
        return shares;
    }
    /**
    * @dev Make a deposit to proposal creating new shares
    * - MUST account for proposalNumber
    * - MUST have proposalNumber
    * NOTE: using the mint() will cause shares to not be accounted for in a proposal
    * @param shares amount being deposited
    * @param receiver address of depositor
    * @param proposal number asscoiated proposal
    */
     function proposalMint(uint256 shares, address receiver, uint256 proposal) public virtual returns(uint256){
         require(!closedProposal(proposal));
         require(proposalCheck() <= proposal);

         uint256 assets = mint(shares, receiver);
         _totalShares[proposal] = add(totalShares(proposal), assets);

         uint256 cc = userNumOfProposal(msg.sender) + 1;
         userBook[receiver][proposal].deposit = add(userDeposit(receiver, proposal), assets);
         userBook[msg.sender][0].proposal = cc;
         userBook[msg.sender][cc].proposal = proposal;

         return assets;
    }
    /**
    * @dev Burn shares, receive 1 to 1 value of assets
    * - MUST have closed proposalNumber
    * - MUST NOT be userWithdrew amount greater than userDeposit amount
    */
    function proposalWithdraw(uint256 assets, address receiver, address owner, uint256 proposal)public virtual returns(uint256){
        require(closedProposal(proposal));
        require(userWithdrew(receiver, proposal) >= userDeposit(receiver, proposal));
    
        uint256 shares = withdraw(assets, receiver, owner);
        userBook[receiver][proposal].withdrew = add(userWithdrew(receiver, proposal), shares);
        
       return shares;
    }
    /**
    * @dev Burn shares, receive 1 to 1 value of assets
    * - MUST have open proposal number
    * - MUST have user deposit greater than or equal to user withdrawal
    * NOTE: using ERC 4626 redeem() will not account for proposalWithdrawal
    */
    function proposalRedeem(uint256 shares, address receiver, address owner, uint256 proposal) public virtual returns(uint256){
        require(closedProposal(proposal));
        require(userWithdrew(receiver, proposal) <= userDeposit(receiver, proposal));

        uint256 assets = redeem(shares, receiver, owner);
        userBook[receiver][proposal].withdrew = add(userWithdrew(receiver, proposal), assets);

        return assets;
    }
    /**
    * @dev Issue new proposal
    * - MUST create new proposal number
    * - MUST account for amount withdrawn 
    * @param token address of ERC20 token
    * @param amount token amount being withdrawn
    * @param receiver address of token recipent
    */
    function proposalOpen(address token, uint256 amount, address receiver) external virtual auth returns (uint256){
        SafeERC20.safeTransfer(IERC20(token), receiver, amount);

        uint256 num = proposalCheck() + 1;
        proposalBook[num].token = token;
        proposalBook[num].withdrew = amount;
        proposalBook[num].received = 0;
        _proposalNum = num;
        
        emit proposals(token, num, amount, receiver);
        return(num);
    }
    /**
    * @dev Close an opened proposal
    * - MUST account for amount received
    * - MUST proposal must be greater than current proposal
    * @param token address of ERC20 token
    * @param proposal number of desired proposal to close
    * @param amount number assets being received
    */
    function proposalClose(address token, uint256 proposal, uint256 amount) external virtual returns (bool){
        require(getAuth(msg.sender));
        require(proposalCheck() >= proposal);
        require(!closedProposal(proposal));
        
        SafeERC20.safeTransferFrom(IERC20(token), msg.sender, address(this), amount);
        _closedProposals[proposal] = true;
        proposalBook[proposal].received = amount;

        emit proposals(token, proposal, amount, msg.sender);
        return true; 
    }
    /**
    * @dev Optional accounting for tokens deposited by owner
    * - MUST be contract owner
    * NOTE: No shares are issued, funds can not be redeemed. Only withdrawn from proposalOpen
    * @param token address of ERC20 token
    * @param sender address of where tokens from
    * @param amount number of assets being deposited
    */
    function depositReserve(address token, address sender, uint256 amount) external virtual {
        require(whosOwner() == msg.sender);
        
        SafeERC20.safeTransferFrom(IERC20(token), sender, address(this), amount);

        uint256 time = block.timestamp;
        uint256 cc = accountCheck() + 1;
        ownerBook[cc].deposit = amount;
        ownerBook[cc].time = time;
        ownerBook[cc].token = token;
        _ownerDeposits = cc;
            
        emit depositCom(token, amount, time, cc);  
    }
    

}