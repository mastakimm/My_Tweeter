import UserItem from "@/views/user/contents/Profile/Follow/userItem.jsx";
import {v4 as uuidv4} from "uuid";
import {useOutletContext} from "react-router-dom";

function FollowFollowings() {
    const { dataFollowings, followingsLoading } = useOutletContext()

    return (
        <div>
            {
                !followingsLoading &&
                dataFollowings.data.data.map((user) => (
                    <UserItem key={uuidv4()} userName={user.fullname} userTag={user.tagname} type={'following'} />
                ))
            }
        </div>
    )
}

export default FollowFollowings