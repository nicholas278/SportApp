	<div id="contentwrap">
		<div class="otherpages" class="color3">
			<div class="pagepurposewrap">
				<h1>
				CONTRIBUTE
				</h1>
			</div>
			<div class="pagecontentwrap">
				<div class="pagecontent">
					<div class="pagecontentleft">
                                            <p>Are we missing your favorite place?</p>
                                            <p>Or has a place been recently closed down?</p>
                                            <p>Let us know! [Insert Name] relies on users to keep our content updated. If you think there is anything missing or wrong in our database, please fill out the form on the right to help us out.</p>
					</div>
					<div class="pagecontentright">
					<form action="contact.php" method="post" id="contributeform">
						<div class="formlabel">
							<label for="Name">Your Name:</label>
						</div>
						<input type="text" maxlength="35" class="formtextbox" name="c_name">
						<br>
						<div class="formlabel">
							<label for="Email">Your Email:</label>
						</div>
						<input type="text" maxlength="60" class="formtextbox" name="c_email">
						<br>
						<div class="formlabel">
							<label for="Subject">Sport:*</label>
						</div>
							<form action="URL"> <!--finish off the action nick-->
								<select name="sportsinput" id="sportinput">
									<option value="default" selected id="defaultsportinput">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Sports -</option>
									<option value="Badminton">Badminton</option>
									<option value="Baseball">Baseball</option>
									<option value="Basketball">Basketball</option>
									<option value="Golf">Golf</option>
									<option value="Gym">Gym</option>
									<option value="Hockey">Hockey</option>
									<option value="RockClimbing">Rock Climbing</option>
									<option value="Soccer">Soccer</option>
									<option value="Squash">Squash</option>									
									<option value="Swimming">Swimming</option>
									<option value="TableTennis">Table Tennis</option>
									<option value="Tennis">Tennis</option>
									<option value="Ultimate">Ultimate</option>
									<option value="Volleyball">Volleyball</option>
									<option value="Yoga">Yoga</option>
								</select>
							</form>
						<input type="text" maxlength="60" id="othersportsbox" class="formtextbox" name="c_othersport" placeholder="&nbsp;Other Sports">
						<br>
						<div class="formlabel">
							<label for="Location">Location:*</label>
						</div>
						<input type="text" maxlength="60" class="formtextbox" name="c_location">
						<br>
						<div class="formlabel">
							<label for="OtherInfo">Other Information:</label>
						</div>
						<div class="otherinfo">
						<textarea name="c_otherinfo"></textarea>
							<br>
							<input type="submit" value="Send" ><input type="reset" value="Clear">
							<p>
							*mandatory fields
							</p>
						</div>
					</form>
					</div>
				</div>				
			</div>
		</div>
	</div>