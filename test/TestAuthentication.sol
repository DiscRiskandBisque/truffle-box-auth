pragma solidity 0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Authentication.sol";

contract TestAuthentication {

  function testUserCanSignUpAndLogin() public {
    Authentication authentication = Authentication(DeployedAddresses.Authentication());

    authentication.signup('testuser');

    bytes32 expected = 'testuser';

    Assert.equal(authentication.login(), expected, "It should sign up and log in a user.");
  }

}
