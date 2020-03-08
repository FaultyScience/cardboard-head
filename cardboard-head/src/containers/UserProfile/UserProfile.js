import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./UserProfile.module.css";
import * as actions from "../../store/actions/index";
import Header from "../Header/Header";
import NavBar from "../../components/UI/Navigation/NavBar/NavBar";
import ProfileImg from "../../components/UI/ProfileImg/ProfileImg";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorMsg from "../../components/Header/ErrorMsg/ErrorMsg";
import MiniSpinner from "../../components/UI/MiniSpinner/MiniSpinner";
import fail from "../../assets/images/fail.png";

class UserProfile extends Component {

  displayNameInput = React.createRef();

  async componentDidMount() {

    if (localStorage.getItem("sellswordToken")) {
      await this.props.onInitLoggedIn();
    }

    this.props.onGetPlayerProfile(this.props.userId);
  }

  render() {

    const profileImg = <ProfileImg uid={this.props.userId}
                                   iid={this.props.imageId}
                                   inputImageUri={this.props.inputImageUri}
    />;

    const imageSpinner = (

      <div className={classes.ImageSpinner}>
        <Spinner />
      </div>
    );

    const miniSpinner = (

      <div className={classes.MiniSpinner}>
        <MiniSpinner />
      </div>
    );

    const buttonText = this.props.saving ? miniSpinner : "Save";
    const saveBtnClass = this.props.saving ? classes.Saving : classes.SaveButton;
    const saveBtnWrapperClass = this.props.saving ? classes.SavingButtonWrapper : classes.SaveButtonWrapper;

    let savedClasses = [classes.ShowSavedMsg];
    let saveErrorClasses = [classes.ShowErrorMsg];

    const savedMsg = this.props.saved ? "Profile saved!" : "";
    const saveErrorMsg = this.props.saveErrorMsg ? this.props.saveErrorMsg : "";

    if (this.props.saved) savedClasses.push(classes.HideSavedMsg);
    if (this.props.saveErrorMsg) saveErrorClasses.push(classes.HideErrorMsg);

    savedClasses = savedClasses.join(" ");
    saveErrorClasses = saveErrorClasses.join(" ");

    const saveErrorP = (

      <p>
        {this.props.saveErrorMsg ? <img src={fail} alt="x" className={classes.Fail} /> : null}
        {saveErrorMsg}
      </p>
    );

    const profile = (

      <div className={classes.UserProfile}>
        <div className={classes.ImgOuterWrapper}>
          <label htmlFor="imageUpload">
            <div className={classes.ImgWrapper}>
              {this.props.imageLoading ? imageSpinner : profileImg}
            </div>
          </label>
          <label htmlFor="imageUpload">
            <div className={classes.ImgButtonWrapper}>
              <div className={classes.ImgButton}>
                <span>Update Image</span>
              </div>
            </div>
          </label>
        </div>
        <input type="file"
               id="imageUpload"
               name="imageUpload"
               style={{ height: 0, width: 0 }}
               accept=".png, .jpeg, .jpg"
               onChange={this.props.onInputImageChanged}
        />
        <div className={classes.DisplayName}>
          <label>Display Name</label>
          <input type="textbox"
                 ref={this.displayNameInput}
                 value={this.props.inputDisplayName}
                 onChange={this.props.onInputDisplayNameChanged}
          />
        </div>
        <p className={classes.Optional}>
          <em>All fields are optional, but filling them out will help you
          find like-minded players.</em><
        /p>
        <hr className={classes.Line} />
        <div className={classes.Rules}>
          <h4>How do you prefer to follow game rules and learn a game? (choose one)</h4>
          <div>
            <input type="radio"
                   id="casual"
                   name="rules"
                   value="casual"
                   onChange={this.props.onInputRulesChanged}
                   defaultChecked={this.props.inputRules === "casual"}
            />
            <label htmlFor="casual">
              <strong>Casually</strong> - It's ok if we make mistakes or house
              rule: let's keep the game moving. When learning, we can just
              read enough of the rules to get started, and then figure it out.
            </label>
          </div>
          <div>
            <input type="radio"
                   id="semi-strict"
                   name="rules"
                   value="semi-strict"
                   onChange={this.props.onInputRulesChanged}
                   defaultChecked={this.props.inputRules === "semi-strict"}
            />
            <label htmlFor="semi-strict">
              <strong>Somewhat strictly</strong> - Let's try to follow the
              rules by the book, but we can house rule if checking is taking longer
              than a minute.  When learning, we should understand at least
              80% of the rules before we play.
            </label>
          </div>
          <div>
            <input type="radio"
                   id="strict"
                   name="rules"
                   value="strict"
                   onChange={this.props.onInputRulesChanged}
                   defaultChecked={this.props.inputRules === "strict"}
            />
            <label htmlFor="strict">
              <strong>Strictly</strong> - Let's go strictly by the book, even
              if we need to hold the game up for a little while to play
              correctly.  When learning, we should understand all of the
              rules before we play.
            </label>
          </div>
          <div>
            <input type="radio"
                   id="no-pref"
                   name="rules"
                   value="no-pref"
                   onChange={this.props.onInputRulesChanged}
                   defaultChecked={this.props.inputRules === "no-pref"}
            />
            <label htmlFor="no-pref">
              <strong>No preference</strong> - I'll go with the flow.
            </label>
          </div>
        </div>
        <hr className={classes.Line} />
        <div className={classes.WeightPref}>
          <h4>Which class of board games do you prefer? (select one or more)</h4>
          <div>
            <input type="checkbox"
                   id="lightweight"
                   name="lightweight"
                   value="lightweight"
                   onChange={this.props.onInputLightChanged}
                   defaultChecked={this.props.inputLight}
            /> <strong>Lightweight</strong> (games typically take 15 - 60 minutes, with simple rules)
          </div>
          <div>
            <input type="checkbox"
                   id="middleweight"
                   name="middleweight"
                   value="middleweight"
                   onChange={this.props.onInputMiddleChanged}
                   defaultChecked={this.props.inputMiddle}
            /> <strong>Middleweight</strong> (games typically take 1 - 4 hours, with somewhat complex rules)
          </div>
          <div>
            <input type="checkbox"
                   id="heavyweight"
                   name="heavyweight"
                   value="heavyweight"
                   onChange={this.props.onInputHeavyChanged}
                   defaultChecked={this.props.inputHeavy}
            /> <strong>Heavyweight</strong> (games typically take over 4 hours, with very complex rules)
          </div>
        </div>
        <hr className={classes.Line} />
        <div className={classes.Age}>
          <h4>Age</h4>
          <select name="age"
                  value={this.props.inputAge}
                  onChange={this.props.onInputAgeChanged}
          >
            <option value="default">&#60;Select&#62;</option>
            <option value="<21">Under 21</option>
            <option value="21-29">21 - 29</option>
            <option value="30-39">30 - 39</option>
            <option value="40-49">40 - 49</option>
            <option value="50+">50+</option>
            <option value="no-response">Prefer not to say</option>
          </select>
        </div>
        <hr className={classes.Line} />
        <div className={classes.About}>
          <h4>About</h4>
          <textarea value={this.props.inputAbout}
                    onChange={this.props.onInputAboutChanged}
                    placeholder="I'm kind of a big deal in the <insert favorite game> community..."
          />
        </div>
        <hr className={classes.Line} />
        <div className={classes.Notification}>
          <div className={saveErrorClasses}>
            {saveErrorP}
          </div>
          <div className={savedClasses}>
            <p>{savedMsg}</p>
          </div>
        </div>
        <div className={saveBtnWrapperClass}
             onClick={() => this.props.onSubmitPlayerProfile(this.props.saving,
                                                             this.props.userId,
                                                             this.props.inputImageFile,
                                                             this.props.inputDisplayName,
                                                             this.props.inputRules,
                                                             this.props.inputLight,
                                                             this.props.inputMiddle,
                                                             this.props.inputHeavy,
                                                             this.props.inputAge,
                                                             this.props.inputAbout)}
        >
          <div className={saveBtnClass}>
            <span>{buttonText}</span>
          </div>
        </div>
      </div>
    );

    const spinner = (

      <div className={classes.Spinner}>
        <Spinner />
      </div>
    );

    const errorMsg = (

      <div className={classes.Error}>
        <ErrorMsg show align="center" msg={this.props.errorMsg} />
      </div>
    );

    return (

      <>
        <Header />
        <NavBar />
        {this.props.loading ? spinner : null}
        {(!this.props.loading && this.props.errorMsg) ? errorMsg : null}
        {(!this.props.loading && !this.props.errorMsg) ? profile : null}
      </>
    );
  }
}

const mapStateToProps = state => {

  return {
    userId: state.auth.userId,
    displayName: state.auth.displayName,
    isLoggedIn: state.auth.token !== null,
    loading: state.playerProfile.loading,
    age: state.playerProfile.age,
    rules: state.playerProfile.rules,
    about: state.playerProfile.about,
    errorMsg: state.playerProfile.errorMsg,
    saveErrorMsg: state.playerProfile.saveErrorMsg,
    inputImageFile: state.playerProfile.inputImageFile,
    inputImageUri: state.playerProfile.inputImageUri,
    inputDisplayName: state.playerProfile.inputDisplayName,
    inputRules: state.playerProfile.inputRules,
    inputLight: state.playerProfile.inputLight,
    inputMiddle: state.playerProfile.inputMiddle,
    inputHeavy: state.playerProfile.inputHeavy,
    inputAge: state.playerProfile.inputAge,
    inputAbout: state.playerProfile.inputAbout,
    imageId: state.playerProfile.imageId,
    imageLoading: state.playerProfile.imageLoading,
    saving: state.playerProfile.saving,
    saved: state.playerProfile.saved
  };
};

const mapDispatchToProps = dispatch => {

  return {
    onInitLoggedIn: () => dispatch(actions.initLoggedIn()),
    onGetPlayerProfile: (userId) => dispatch(actions.getPlayerProfile(userId)),
    onInputImageChanged: (e) => dispatch(actions.processInputImageChanged(e, e.target.files[0])),
    onInputDisplayNameChanged: (event) => dispatch(actions.profInputDisplayNameChanged(event.target.value)),
    onInputRulesChanged: (event) => dispatch(actions.inputRulesChanged(event.target.value)),
    onInputLightChanged: (event) => dispatch(actions.inputLightChanged(event.target.checked)),
    onInputMiddleChanged: (event) => dispatch(actions.inputMiddleChanged(event.target.checked)),
    onInputHeavyChanged: (event) => dispatch(actions.inputHeavyChanged(event.target.checked)),
    onInputAgeChanged: (event) => dispatch(actions.inputAgeChanged(event.target.value)),
    onInputAboutChanged: (event) => dispatch(actions.inputAboutChanged(event.target.value)),

    onSubmitPlayerProfile: (saving, userId, inputImageFile, inputDisplayName,
      inputRules, inputLight, inputMiddle, inputHeavy, inputAge, inputAbout) =>

      dispatch(actions.submitPlayerProfile(saving, userId, inputImageFile,
        inputDisplayName, inputRules, inputLight, inputMiddle, inputHeavy,
        inputAge, inputAbout))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
