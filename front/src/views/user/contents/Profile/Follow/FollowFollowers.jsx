import {v4 as uuidv4} from "uuid";
import UserItem from "@/views/user/contents/Profile/Follow/userItem.jsx";
import {useOutletContext} from "react-router-dom";

function FollowFollowers() {
    const { dataFollowings, dataFollowed, followedLoading } = useOutletContext()

    const IsUserFollow = (uid) => {
        let BoolReturn = true

        dataFollowings.data.data.forEach(user => {
            if (user.id === uid) {
                BoolReturn = false
            }
        })

        return BoolReturn
    }

    return (
        <div>
            {
                !followedLoading &&
                dataFollowed.data.data.map((user) => (
                    <UserItem key={uuidv4()} userName={user.fullname} userTag={user.tagname} type={'follower'} isFollow={IsUserFollow(user.id)} />
                ))
            }
        </div>
    )
}

export default FollowFollowers