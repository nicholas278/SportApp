	<div id="dbcontentwrap">
		<div id="lefttable" class="color6">
			database display table to be implemented in later versions
		</div>
		<div id="rightinput" class="color6">
			<form action="javascript:void(0);" id="newentryinput">
                                <div id="headerholder">
                                    <h2>
                                        New Entry
                                    </h2>
                                    <div class="dbbuttons">
                                            <input type="submit" id="dbSubmit" value="Enter" ><input type="reset" value="Clear">
                                    </div>
                                </div>
				<div class="heading">
					<label for="db_sport">Sport:</label>
				</div>
                                <div class="inputplaceholder">
					<form>
						<select name="sportsinput" id="dbsportinput">
							<option value="default" selected id="defaultsportinput">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span vertical-align: middle>- Sports -</span></option>
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
                                </div>
				<div class="heading">
					<label for="db_name">Name:</label>
				</div>
                                
                                <div class="inputplaceholder">
                                    <input type="text" maxlength="60" class="formtextbox" name="db_name">
                                </div>
				<div class="heading">
					<label for="db_address">Address:</label>
				</div>
                                <div class="inputplaceholder">
                                    <input type="text" maxlength="60" class="formtextbox" name="db_address">
				</div>
				<div class="heading">
					<label for="db_city">City:</label>
				</div>
                                <div class="inputplaceholder">
					<form>
						<select name="cityinput" id="cityinput">
							<option value="default" selected id="defaultsportinput">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span vertical-align: middle>- City -</span></option>
							<option value="Richmond">Richmond</option>
							<option value="Vancouver">Vancouver</option>
							<option value="Burnaby">Burnaby</option>
						</select>
					</form>
				</div>
				<div class="heading">
					<label for="db_province">Province:</label>
				</div>
                                <div class="inputplaceholder">
					<form>
						<select name="provinceinput" id="provinceinput">
							<option value="default" selected id="defaultsportinput">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span vertical-align: middle>- Province -</span></option>
							<option value="BC">BC</option>
						</select>
					</form>
				</div>
				<div class="heading">
					<label for="db_country">Country:</label>
				</div>
                                <div class="inputplaceholder">
					<form>
						<select name="provinceinput" id="provinceinput">
							<option value="default" selected id="defaultsportinput">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span vertical-align: middle>- Country -</span></option>
							<option value="BC">Canada</option>
						</select>
					</form>
				</div>
				<div class="heading">
					<label for="db_postalcode">Postal Code:</label>
				</div>
                                <div class="inputplaceholder">
                                    <input type="text" maxlength="60" class="formtextbox" name="db_postalcode">
				</div>
			</form>
		</div>
	</div>
