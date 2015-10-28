////// Narrow Mode
@media (min-width: 10px) and (max-width: 600px)
	.emailContactInfo
		padding-top: 6px
		font-size : 10px
		visibility : visible
	.contactInfo_sub
		font-size : $fontSize_med
	.ContactInfoGroup
		top : 26px
	.GroupOfThumbs
		margin-left: 0%
		margin-right: 0%
		width: 100%

	.imageThumb
		margin-left : 2px
		margin-top : 2px
		padding: 0px
		width : 55px
		height : 55px
		overflow : hidden
		border : 1px solid black 
		position : relative
		float: left

	.imageThumb img 
		height : 100%


//////  Wide Mode 
//@media (min-width: 601px)
	.emailContactInfo
		padding-top: 0px
		visibility : hidden
	.contactInfo_sub
		font-size : $fontSize_med3
	.ContactInfoGroup
		top : 49px
	.GroupOfThumbs
		margin-left: 18%
		margin-right: 12%
		width: 70%
	.imageThumb
		padding: 0px
		width : 104px
		height : 104px
		overflow : hidden
		border : 1px solid black 
		position : relative
		float: left
		margin-left : 2px
		margin-top : 2px
	.imageThumb img 
		height : 100%
	