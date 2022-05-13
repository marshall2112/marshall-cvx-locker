import { Staked } from "../generated/CvxLockerV2/CvxLockerV2";
import { CvxLock } from "../generated/schema";

export function handleStaked(event: Staked): void {
  //    event Staked(address indexed _user, uint256 indexed _epoch, uint256 _paidAmount, uint256 _lockedAmount, uint256 _boostedAmount);
  let cvxLock = CvxLock.load(event.transaction.hash.toHex());

  if (cvxLock === null) {
    cvxLock = new CvxLock(event.transaction.hash.toHex());
    cvxLock.user = event.params._user;
    cvxLock.lockAmount = event.params._lockedAmount;
    cvxLock.epoch = event.params._epoch;
    cvxLock.save();
  }
}
