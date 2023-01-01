import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { AiOutlineAim } from 'react-icons/ai'
import { GiTorch } from 'react-icons/gi'
import { MdOutlinePrivacyTip, MdPeopleOutline } from 'react-icons/md'

const CreateTribe = () => {
    return (
        <>

            <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }} >


                <Col lg={8} xs={11} style={{ backgroundColor: "#16181b", color: "white", marginTop: "16px", padding: "16px" }} >
                    <label style={{ fontWeight: "500", display: "flex", alignItems: "center" }} htmlFor="email" className="form-label">
                        {/* <AiOutlineMail color='#007bff' size={20} /> */}
                        <MdPeopleOutline size={20} style={{ marginRight: '4px' }} />

                        Name of the Tribe  </label>


                    <input name='title' required pattern="[a-zA-Z0-9 ]+" type="text" style={{ padding: "0.5rem", outline: "none", border: "1px solid #363636", backgroundColor: "#16181b", width: "100%", caretColor: 'white ', color: "white", fontWeight: "600", borderRadius: '0.5rem', margin: " 0 0 0.5rem 0" }} maxLength='100' placeholder='Eg: Startups' />



                    <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }} >
                        <label style={{ fontWeight: "500", display: "flex", alignItems: "center", margin: 0 }} htmlFor="email" className="form-label">
                            <AiOutlineAim size={20} style={{ marginRight: '4px' }} />
                            Purpose  </label>
                        <select name='category' id="" style={{ outline: "none", backgroundColor: "#19191a", color: "silver", border: '1px solid #363636', borderRadius: "1rem", fontSize: "16px", padding: " 4px 0.5rem", marginLeft: "4px", color: "white" }} >
                            <option value="Activism">Activism</option>
                            <option value="Addictive Support">Addictive Support</option>
                            <option value="Animals and Pets">Animals and Pets</option>
                            <option value="Anime">Anime</option>
                            <option value="Art">Art</option>
                            <option value="Beauty And Makeup">Beauty And Makeup</option>
                            <option value="Business And Finance">Business And Finance</option>
                            <option value="Careers">Careers</option>
                            <option value="Cars And Motor Vehicles">Cars And Motor Vehicles</option>
                            <option value="Celebrity">Celebrity</option>
                            <option value="Crafts and DIY">Crafts and DIY</option>
                            <option value="Culture Race And Ethnicity">Culture Race And Ethnicity</option>
                            <option value="Ethics And Philosophy">Ethics And Philosophy</option>
                            <option value="Family And Relationships">Family And Relationships</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Fitness And Nutrition">Fitness And Nutrition</option>
                            <option value="Food And Drink">Food And Drink</option>
                            <option value="Fun And Humour">Fun And Humour</option>
                            <option value="Food And Drink">Food And Drink</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Gender">Gender</option>
                            <option value="Gender">Gender</option>
                            <option value="History">History</option>
                            <option value="Hobbies">Hobbies</option>
                            <option value="Hobbies">Hobbies</option>
                            <option value="Home And Garden">Home And Garden</option>
                            <option value="Internet Culture And Memes">Internet Culture And Memes</option>
                            <option value="Law">Law</option>
                            <option value="Learning And Education">Learning And Education</option>
                            <option value="Medical And Mental Health">Medical And Mental Health</option>
                            <option value="Military">Military</option>
                            <option value="Movies">Movies</option>
                            <option value="Music">Music</option>
                            <option value="Outdoors And Nature">Outdoors And Nature</option>
                            <option value="Place">Place</option>
                            <option value="Podcast And Streamers">Podcast And Streamers</option>
                            <option value="Politics">Politics</option>
                            <option value="Programming">Programming</option>
                            <option value="Reading Writing And Literature">Reading Writing And Literature</option>
                            <option value="Religion And Spirituality">Religion And Spirituality</option>
                            <option value="Religion And Spirituality">Religion And Spirituality</option>
                            <option value="Science">Science</option>
                            <option value="Sports">Sports</option>
                            <option value="Technology">Technology</option>
                            <option value="Television">Television</option>
                            <option value="Trauma Support">Trauma Support</option>
                            <option value="Travel">Travel</option>
                            <option value="Women's Health">Womens Health</option>
                            <option value="World News">World News</option>
                            <option value="None of these">None of these</option>


                        </select>
                    </div>


                    <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }} >
                        <label style={{ fontWeight: "500", display: "flex", alignItems: "center", margin: 0 }} htmlFor="email" className="form-label">
                            <MdOutlinePrivacyTip size={20} style={{ marginRight: '4px' }} />
                            Tribe type  </label>
                        <select name='category' id="" style={{ outline: "none", backgroundColor: "#19191a", color: "silver", border: '1px solid #363636', borderRadius: "1rem", fontSize: "16px", padding: " 4px 0.5rem", marginLeft: "4px", color: "white" }} >
                            <option value="books">Public</option>
                            <option value="crypto">Private</option>

                        </select>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }} >
                        <label style={{ fontWeight: "500", display: "flex", alignItems: "center", margin: 0 }} htmlFor="email" className="form-label">
                            <GiTorch size={20} style={{ marginRight: '4px' }} />
                            Founder  </label>
                        <select name='category' id="" style={{ outline: "none", backgroundColor: "#19191a", color: "silver", border: '1px solid #363636', borderRadius: "1rem", fontSize: "16px", padding: " 4px 0.5rem", marginLeft: "4px", color: "white" }} >
                            <option value="books">@username</option>
                            <option value="crypto">@username</option>

                        </select>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginTop: "16px", justifyContent: "end" }}  >

                        <button className='postbtn' style={{ padding: "4px 1rem", margin: "1rem 1rem 0.5rem 0.5rem", backgroundColor: "black" }} >
                            Cancel
                        </button>
                        <button className='postbtn' style={{ padding: "4px 1rem", margin: "1rem 0.5rem 0.5rem 0.5rem" }} >
                            Create Tribe
                        </button>
                    </div>


                </Col>
            </div>

        </>
    )
}

export default CreateTribe