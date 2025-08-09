/* Constants Placeholder */

/* 
For use in the "Log" portion of the homepage
Used to create the optional fields, their text title, and placeholder text
*/
const optionalFields = {
	roastLevel: ["Roast Level", "e.g. Dark Roast (optional)"],
	coffeeAmount: ["Coffee Amount", "e.g. 13g (optional)"],
	waterTemp: ["Water Temperature", "e.g. 212°F (optional)"],
	waterAmount: ["Water Amount", "e.g. 200g (optional)"],
	grindSize: ["Grind Size", "e.g. Medium Fine (optional)"],
	brewTime: ["Brew Time", "e.g. 3 minutes (optional)"],
	notes: ["Notes", "e.g. Clean, lingering sweetness (optional)"],
};

/* 
For use in the "Log" and "Adjust" portion of the homepage
Used to display the entry information to view it in both portions
*/
const fieldNames = {
	title: "Entry Title",
	date: "Date",
	roastLevel: "Roast Level",
	coffeeAmount: "Coffee Amount",
	waterTemp: "Water Temperature",
	waterAmount: "Water Amount",
	grindSize: "Grind Size",
	brewTime: "Brew Time",
	notes: "Notes",
	aroma: "Aroma",
	texture: "Texture",
	flavor: "Flavor",
	acidity: "Acidity",
};

/*
For use in "Adjust" portion of the homepage
Displays solution text for each issue when the user selects that issue
*/
const issueSolutions = {
	bitter: `Bitterness usually comes from bad beans or brewing issues.

1. Check your beans. Cheap, super dark roasted beans, and certain types of
Robusta beans tend to be more bitter.

2. Over-extraction of the coffee beans due to the coffee being grinded too
fine (or small) is another common issue.

3. If the grind size seems standard, check the brew time. Most coffee methods
brew for around 1-5 minutes.

4. Research the ideal ratio of coffee to water for your brewing technique.
Most common ratios range between 1:15 to 1:17. Try to avoid below 1:12 or above
1:21 for non-espresso brews.

5. Avoid excessive agitation during brewing.

6. If nothing else, try brewing at a lower temperature (ex. <205°).`,

	sour: `Sourness mainly comes from incorrect brewing.
    
1. Check how fine (small) your ground coffee is. If it's super coarse, try
grinding them to be smaller.

2. For non-espresso drinks, try increasing the brew time by 20-30 seconds,
especially if it's under a minute.

3. Research the ideal ratio of coffee to water for your brewing technique.
Most common ratios range between 1:15 to 1:17. Try to avoid below 1:12 or above
1:21 for non-espresso brews.

4. If your water is on the cooler side (ex. <205°), try brewing it with
freshly off-the-boil water.`,

	weak: `Weak or watery coffee mainly comes from an incorrect ratio of coffee
to water, with weaker coffee coming from higher amounts of water.

1. Measure the amount of coffee to water, keeping the ratio less than 1:21, 
ideally around 1:18 or less. If increased bitterness arises, adjust the grind
size as opposed to increasing water.
    
2. Check typical brew times for your method and, if within range, try adding
30-60 seconds on the clock.

3. If the coffee is weak but without much bitterness, try increasing extraction
by grinding finer (smaller).

4. If nothing else, try increasing water temperatures to help extract more
flavors.`,

	heavy: `Heavy or bold coffee is likely due to an over-extraction or a darker roast.

1. The most common reason for a heavy cup of coffee is a low coffee to water
ratio. Most espresso uses between 1:1 to 1:3 but non-espresso drinks are often
between 1:16 to 1:18. Try to avoid lower than a 1:14 ratio.

2. If the coffee tastes bold and heavy without much bitterness, try grinding
a little bit coarser which will lessen the extraction.

3. Extra agitation or stirring can also contribute to a bolder cup.`,

	burnt: `If your coffee tastes burnt, the easiest and most common problems are from
bad coffee and unclean coffee machines/tools.
    
1. Super cheap or incredibly dark roasted coffee can have a burnt taste.
    
2. Oils in uncleaned coffee machines can also contribute to a burnt taste.

3. Unlikely but possible issues can arise from an overextraction
(ex. too finely ground) of beans or too hot of water.`,

	bland: `If your coffee tastes bland, the most common issue is not enough
coffee.

1. If your ratio is greater than 1:21, try a common 1:18 ratio, or 1:16 ratio.
Some people enjoy even lower, which you could try if it's still bland.
    
2. You could attempt to grind a bit finer if the coffee doesn't taste bitter.

3. Otherwise, try increasing water temperatures or brewing for longer.`,

	cardboard: `Beans that taste like cardboard or stale/papery often comes from
from the quality of the beans.

1. Older coffee, especially pre-ground can taste stale or like cardboard.

2. Otherwise, check that your water temps are above 200° which may impart this
taste.`,
	overextracted: `1. Overextracted coffee tasting bitter or harsh can be solved by grinding
coarser, as super fine particles can slip through or get in the taste.

2. A long brew time can also lead to overextraction. Try limiting it to 3-4
minutes or lower.

3. Lastly, a ratio of 1:14 or lower for most non-espresso techniques could be
overextracted depending on your preferences and the coffee beans.`,
};

export { optionalFields, fieldNames, issueSolutions };
