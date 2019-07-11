//Typography script that will be used in conjuction with fonts parsed in by the
//admin-settings.php file.


//The handler set to this javascript file with the data it contains is named: 'selected-fonts'
//The fonts that the user selects (either defualt or manually selected), will all be parsed by the 
//heading names of the specific fonts (heading_font/subheading_font/typography_presets)

console.log(selectedFonts);

//If user decided to use their own fonts (clicked no)
if (selectedFonts["defaultFont"] == "no"){
WebFont.load({
    google: {
       families: [selectedFonts["heading_font"], selectedFonts["subheading_font"], selectedFonts["typography_presets"]]
    }
});
}

//If user decided to use default fonts (clicked yes)
else if (selectedFonts["defaultFont"] == "yes"){
  selectedFonts["heading_font"] = "Droid Sans";
  selectedFonts["subheading_font"] = "Droid Sans";
  selectedFonts["typography_presets"] = "Droid Sans";
  selectedFonts["typography_code"] = "";
 
  WebFont.load({
    google: {
      families: [selectedFonts["heading_font"], selectedFonts["subheading_font"], selectedFonts["typography_presets"]]
    }
  });
}