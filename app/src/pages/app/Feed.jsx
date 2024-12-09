import { useEffect } from "react"
import PostEditing from "../../components/PostEditing";
import CustomBox from "../../components/shared/CustomBox";
import Widget from "../../components/shared/Widget";
import { useSelector } from "react-redux";

const widget = {
    events: "events",
}

const Feed = () => {
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        document.title = "Feed - Found!";
    }, []);
    return (
        <>
            <div className="flex gap-6">
                <div className="w-full md:max-w-[640px] xl:max-w-[660px] 2xl:max-w-[830px]">
                    <PostEditing />
                    <CustomBox profile="Ludovica Spinelli" imgProfile="https://images.pexels.com/photos/12421204/pexels-photo-12421204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" nickname="_luvi_" dataPost="5 minuti fa">
                        <p className="dark:text-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus delectus, sed magni nemo debitis ipsam blanditiis saepe impedit veritatis maiores quaerat reiciendis eligendi nam quam error, tenetur accusantium officiis.</p>
                    </CustomBox>
                </div>
                <div className="w-full lg:max-w-[360px] 2xl:max-w-[450px]">
                <Widget title={"Eventi Suggeriti"} wgt={widget.events} role={user.role}/>
                </div>
            </div>
        </>
    )
}

export default Feed