/**
 * Enum of possible crosshair behavior modes.
 * Normal means that the crosshair always follows the pointer.
 * Magnet means that the vertical line of the crosshair follows the pointer, while the horizontal line is placed on the corresponding series point.
 */
export declare const enum CrosshairMode {
	Normal = 0,
	Magnet = 1,
}
export declare const enum LineStyle {
	Solid = 0,
	Dotted = 1,
	Dashed = 2,
	LargeDashed = 3,
	SparseDotted = 4,
}
export declare const enum LineType {
	Simple = 0,
	WithSteps = 1,
}
export declare const enum PriceLineSource {
	/**
	 * The last bar data
	 */
	LastBar = 0,
	/**
	 * The last visible bar in viewport
	 */
	LastVisible = 1,
}
/**
 * Enum of possible price scale modes
 * Normal mode displays original price values
 * Logarithmic mode makes price scale show logarithms of series values instead of original values
 * Percentage turns the percentage mode on.
 * IndexedTo100 turns the "indexed to 100" mode on
 */
export declare const enum PriceScaleMode {
	Normal = 0,
	Logarithmic = 1,
	Percentage = 2,
	IndexedTo100 = 3,
}
/**
 * This function is the main entry point of the Lightweight Charting Library
 * @param container - id of HTML element or element itself
 * @param options - any subset of ChartOptions to be applied at start.
 * @returns an interface to the created chart
 */
export declare function createChart(
	container: string | HTMLElement,
	options?: DeepPartial<ChartOptions>
): IChartApi;
export declare function isBusinessDay(time: Time): time is BusinessDay;
export declare function isUTCTimestamp(time: Time): time is UTCTimestamp;
export declare function version(): string;
/**
 * Structure describing area series options.
 */
export declare type AreaSeriesOptions = SeriesOptions<AreaStyleOptions>;
export declare type AreaSeriesPartialOptions = SeriesPartialOptions<
	AreaStyleOptions
>;
export declare type BarPrice = Nominal<number, 'BarPrice'>;
/**
 * Structure describing bar series options.
 */
export declare type BarSeriesOptions = SeriesOptions<BarStyleOptions>;
export declare type BarSeriesPartialOptions = SeriesPartialOptions<
	BarStyleOptions
>;
/**
 * Structure describing candlesticks series options.
 */
export declare type CandlestickSeriesOptions = SeriesOptions<
	CandlestickStyleOptions
>;
export declare type CandlestickSeriesPartialOptions = SeriesPartialOptions<
	CandlestickStyleOptions
>;
export declare type Coordinate = Nominal<number, 'Coordinate'>;
export declare type DateFormat =
	| "'yy MMM dd"
	| "'yy MMMM dd"
	| 'yyyy MMM dd'
	| 'yyyy MMMM dd'
	| "dd MMM 'yy"
	| "dd MMMM 'yy"
	| 'dd MMM yyyy'
	| 'dd MMMM yyyy'
	| "MMM dd, 'yy"
	| "MMMM dd, 'yy"
	| 'MMM dd, yyyy'
	| 'MMMM dd, yyyy'
	| 'yyyy-MM-dd'
	| 'yy-MM-dd'
	| 'yy/MM/dd'
	| 'yyyy/MM/dd'
	| 'yy.MM.dd'
	| 'yyyy.MM.dd'
	| 'dd-MM-yyyy'
	| 'dd-MM-yy'
	| 'dd/MM/yy'
	| 'dd/MM/yyyy'
	| 'dd.MM.yy'
	| 'dd.MM.yyyy'
	| 'MM-dd-yy'
	| 'MM-dd-yyyy'
	| 'MM/dd/yy'
	| 'MM/dd/yyyy'
	| 'MM.dd.yy'
	| 'MM.dd.yyyy';
export declare type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends infer U
		? DeepPartial<U>[]
		: T[P] extends ReadonlyArray<infer X>
		? ReadonlyArray<DeepPartial<X>>
		: DeepPartial<T[P]>;
};
/**
 * Structure describing histogram series options.
 */
export declare type HistogramSeriesOptions = SeriesOptions<
	HistogramStyleOptions
>;
export declare type HistogramSeriesPartialOptions = SeriesPartialOptions<
	HistogramStyleOptions
>;
export declare type HorzAlign = 'left' | 'center' | 'right';
/**
 * Structure describing line series options.
 */
export declare type LineSeriesOptions = SeriesOptions<LineStyleOptions>;
export declare type LineSeriesPartialOptions = SeriesPartialOptions<
	LineStyleOptions
>;
export declare type LineWidth = 1 | 2 | 3 | 4;
export declare type MouseEventHandler = (param: MouseEventParams) => void;
/**
 * This is the generic type useful for declaring a nominal type,
 * which does not structurally matches with the base type and
 * the other types declared over the same base type
 *
 * Usage:
 * @example
 * type Index = Nominal<number, 'Index'>;
 * // let i: Index = 42; // this fails to compile
 * let i: Index = 42 as Index; // OK
 * @example
 * type TagName = Nominal<string, 'TagName'>;
 */
export declare type Nominal<T, Name extends string> = T & {
	[Symbol.species]: Name;
};
export declare type PriceAxisPosition = 'left' | 'right' | 'none';
export declare type PriceFormat = PriceFormatBuiltIn | PriceFormatCustom;
export declare type PriceFormatterFn = (priceValue: BarPrice) => string;
export declare type SeriesMarkerPosition = 'aboveBar' | 'belowBar' | 'inBar';
export declare type SeriesMarkerShape =
	| 'circle'
	| 'square'
	| 'arrowUp'
	| 'arrowDown';
export declare type SeriesOptions<T> =
	| (T & SeriesOptionsCommon & OverlaySeriesSpecificOptions)
	| (T & SeriesOptionsCommon & NonOverlaySeriesSpecificOptions);
export declare type SeriesPartialOptions<T> =
	| (DeepPartial<T & SeriesOptionsCommon> & OverlaySeriesSpecificOptions)
	| (DeepPartial<T & SeriesOptionsCommon> & NonOverlaySeriesSpecificOptions);
export declare type SeriesType = keyof SeriesOptionsMap;
export declare type Time = UTCTimestamp | BusinessDay | string;
export declare type TimeFormatterFn = (
	time: BusinessDay | UTCTimestamp
) => string;
export declare type TimeRangeChangeEventHandler = (
	timeRange: TimeRange | null
) => void;
export declare type UTCTimestamp = Nominal<number, 'UTCTimestamp'>;
export declare type VertAlign = 'top' | 'center' | 'bottom';
export interface AreaStyleOptions {
	topColor: string;
	bottomColor: string;
	lineColor: string;
	lineStyle: LineStyle;
	lineWidth: LineWidth;
	lineType: LineType;
	crosshairMarkerVisible: boolean;
	crosshairMarkerRadius: number;
}
export interface BarData {
	time: Time;
	open: number;
	high: number;
	low: number;
	close: number;
}
export interface BarPrices {
	open: BarPrice;
	high: BarPrice;
	low: BarPrice;
	close: BarPrice;
}
export interface BarStyleOptions {
	upColor: string;
	downColor: string;
	openVisible: boolean;
	thinBars: boolean;
}
export interface BusinessDay {
	year: number;
	month: number;
	day: number;
}
/** Structure describing a drawing style of the candlestick chart  */
export interface CandlestickStyleOptions {
	/** Color of rising candlesticks */
	upColor: string;
	/** Color of falling candlesticks */
	downColor: string;
	/** Flag to draw/hide candlestick wicks */
	wickVisible: boolean;
	/** Flag to draw/hide candlestick borders around bodies */
	borderVisible: boolean;
	/**
	 * Color of borders around candles' bodies. Ignored if borderVisible == false
	 * If specified, it overrides both borderUpColor and borderDownColor options
	 */
	borderColor: string;
	/** Color of the border of rising candlesticks. Ignored if borderVisible == false or borderColor is specified */
	borderUpColor: string;
	/** Color of the border of rising candlesticks. Ignored if borderVisible == false or borderColor is specified */
	borderDownColor: string;
	/**
	 * Color of candlestick wicks. Ignored if wickVisible == false
	 * If specified, it overrides both wickUpColor and wickDownColor options
	 */
	wickColor: string;
	/** Color of rising candlestick wicks. Ignored if wickVisible == false or wickColor is specified */
	wickUpColor: string;
	/** Color of falling candlestick wicks. Ignored if wickVisible == false or wickColor is specified */
	wickDownColor: string;
}
/**
 * Structure describing options of the chart. Series options are to be set separately
 */
export interface ChartOptions {
	/** Width of the chart */
	width: number;
	/** Height of the chart */
	height: number;
	/** Structure with watermark options */
	watermark: WatermarkOptions;
	/** Structure with layout options */
	layout: LayoutOptions;
	/** Structure with price scale options */
	priceScale: PriceScaleOptions;
	/** Structure with time scale options */
	timeScale: TimeScaleOptions;
	/** Structure with crosshair options */
	crosshair: CrosshairOptions;
	/** Structure with grid options */
	grid: GridOptions;
	/** Structure with localization options */
	localization: LocalizationOptions;
	/** Structure that describes scrolling behavior or boolean flag that disables/enables all kinds of scrolls */
	handleScroll: HandleScrollOptions | boolean;
	/** Structure that describes scaling behavior or boolean flag that disables/enables all kinds of scales */
	handleScale: HandleScaleOptions | boolean;
}
/** Structure describing a crosshair line (vertical or horizontal) */
export interface CrosshairLineOptions {
	/** Color of a certain crosshair line */
	color: string;
	/** Width of a certain crosshair line and corresponding scale label */
	width: LineWidth;
	/** Style of a certain crosshair line */
	style: LineStyle;
	/** Visibility of a certain crosshair line */
	visible: boolean;
	/** Visibility of corresponding scale label */
	labelVisible: boolean;
	/** Background color of corresponding scale label */
	labelBackgroundColor: string;
}
/** Structure describing crosshair options  */
export interface CrosshairOptions {
	/** Crosshair mode */
	mode: CrosshairMode;
	/** Options of the crosshair vertical line */
	vertLine: CrosshairLineOptions;
	/** Options of the crosshair horizontal line */
	horzLine: CrosshairLineOptions;
}
/** Structure describing horizontal or vertical grid line options */
export interface GridLineOptions {
	/** Color of the lines */
	color: string;
	/** Style of the lines */
	style: LineStyle;
	/** Visibility of the lines */
	visible: boolean;
}
/** Structure describing grid options */
export interface GridOptions {
	/** Vertical grid line options */
	vertLines: GridLineOptions;
	/** Horizontal grid line options */
	horzLines: GridLineOptions;
}
export interface HandleScaleOptions {
	mouseWheel: boolean;
	pinch: boolean;
	axisPressedMouseMove: boolean;
	axisDoubleClickReset: boolean;
}
export interface HandleScrollOptions {
	mouseWheel: boolean;
	pressedMouseMove: boolean;
	horzTouchDrag: boolean;
	vertTouchDrag: boolean;
}
/**
 * Structure describing a single item of data for histogram series
 */
export interface HistogramData extends LineData {
	/**
	 * Optional color value for certain data item. If missed, color from HistogramSeriesOptions is used
	 */
	color?: string;
}
export interface HistogramStyleOptions {
	color: string;
	base: number;
}
export interface IChartApi {
	/**
	 * Removes the chart object including all DOM elements. This is an irreversible operation, you cannot do anything with the chart after removing it.
	 */
	remove(): void;
	/**
	 * Sets fixed size of the chart. By default chart takes up 100% of its container
	 * @param width - target width of the chart
	 * @param height - target height of the chart
	 * @param forceRepaint - true to initiate resize immediately. One could need this to get screenshot immediately after resize
	 */
	resize(width: number, height: number, forceRepaint?: boolean): void;
	/**
	 * Creates an area series with specified parameters
	 * @param areaOptions - customization parameters of the series being created
	 * @returns an interface of the created series
	 */
	addAreaSeries(areaOptions?: AreaSeriesPartialOptions): ISeriesApi<'Area'>;
	/**
	 * Creates a bar series with specified parameters
	 * @param barOptions - customization parameters of the series being created
	 * @returns an interface of the created series
	 */
	addBarSeries(barOptions?: BarSeriesPartialOptions): ISeriesApi<'Bar'>;
	/**
	 * Creates a candlestick series with specified parameters
	 * @param candlestickOptions - customization parameters of the series being created
	 * @returns an interface of the created series
	 */
	addCandlestickSeries(
		candlestickOptions?: CandlestickSeriesPartialOptions
	): ISeriesApi<'Candlestick'>;
	/**
	 * Creates a histogram series with specified parameters
	 * @param histogramOptions - customization parameters of the series being created
	 * @returns an interface of the created series
	 */
	addHistogramSeries(
		histogramOptions?: HistogramSeriesPartialOptions
	): ISeriesApi<'Histogram'>;
	/**
	 * Creates a line series with specified parameters
	 * @param lineOptions - customization parameters of the series being created
	 * @returns an interface of the created series
	 */
	addLineSeries(lineOptions?: LineSeriesPartialOptions): ISeriesApi<'Line'>;
	/**
	 * Removes a series of any type. This is an irreversible operation, you cannot do anything with the series after removing it
	 */
	removeSeries(seriesApi: ISeriesApi<SeriesType>): void;
	subscribeClick(handler: MouseEventHandler): void;
	/**
	 * Removes mouse click subscription
	 * @param handler - previously subscribed handler
	 */
	unsubscribeClick(handler: MouseEventHandler): void;
	/**
	 * Adds a subscription to crosshair movement to receive notifications on crosshair movements
	 * @param handler - handler (function) to be called on crosshair move
	 */
	subscribeCrosshairMove(handler: MouseEventHandler): void;
	/**
	 * Removes a subscription on crosshair movement
	 * @param handler - previously subscribed handler
	 */
	unsubscribeCrosshairMove(handler: MouseEventHandler): void;
	/**
	 * Adds a subscription to visible range changes to receive notification about visible range of data changes
	 * @param handler - handler (function) to be called on changing visible data range
	 */
	subscribeVisibleTimeRangeChange(handler: TimeRangeChangeEventHandler): void;
	/**
	 * Removes a subscription to visible range changes
	 * @param handler - previously subscribed handler
	 */
	unsubscribeVisibleTimeRangeChange(handler: TimeRangeChangeEventHandler): void;
	/**
	 * Returns API to manipulate the price scale
	 * @returns - target API
	 */
	priceScale(): IPriceScaleApi;
	/**
	 * Returns API to manipulate the time scale
	 * @returns - target API
	 */
	timeScale(): ITimeScaleApi;
	/**
	 * Applies new options to the chart
	 * @param options - any subset of chart options
	 */
	applyOptions(options: DeepPartial<ChartOptions>): void;
	/**
	 * Returns currently applied options
	 * @returns - full set of currently applied options, including defaults
	 */
	options(): Readonly<ChartOptions>;
	/**
	 * Make a screenshot of the chart with all the elements excluding crosshair.
	 * @returns a canvas with the chart drawn on
	 */
	takeScreenshot(): HTMLCanvasElement;
}
/** Interface to be implemented by the object in order to be used as a price formatter */
export interface IPriceFormatter {
	/**
	 * Formatting function
	 * @param price - original price to be formatted
	 * @returns - formatted price
	 */
	format(price: BarPrice): string;
}
export interface IPriceLine {
	applyOptions(options: Partial<PriceLineOptions>): void;
	options(): Readonly<PriceLineOptions>;
}
/** Interface to control chart's price scale */
export interface IPriceScaleApi {
	/**
	 * Applies new options to the price scale
	 * @param options - any subset of PriceScaleOptions
	 */
	applyOptions(options: DeepPartial<PriceScaleOptions>): void;
	/**
	 * Returns currently applied options of the price scale
	 * @returns full set of currently applied options, including defaults
	 */
	options(): Readonly<PriceScaleOptions>;
}
export interface ISeriesApi<TSeriesType extends SeriesType> {
	/**
	 * Returns current price formatter
	 * @returns - interface to the price formatter object that can be used to format prices in the same way as the chart does
	 */
	priceFormatter(): IPriceFormatter;
	/**
	 * Converts specified series price to pixel coordinate according to the series price scale
	 * @param price - input price to be converted
	 * @returns - pixel coordinate of the price level on the chart
	 */
	priceToCoordinate(price: BarPrice): Coordinate | null;
	/**
	 * Converts specified coordinate to price value according to the series price scale
	 * @param coordinate - input coordinate to be converted
	 * @returns - price value of the coordinate on the chart
	 */
	coordinateToPrice(coordinate: Coordinate): BarPrice | null;
	/**
	 * Applies new options to the existing series
	 * @param options - any subset of options
	 */
	applyOptions(options: SeriesPartialOptionsMap[TSeriesType]): void;
	/**
	 * Returns currently applied options
	 * @returns full set of currently applied options, including defaults
	 */
	options(): Readonly<SeriesOptionsMap[TSeriesType]>;
	/**
	 * Sets or replaces series data
	 * @param data - ordered (earlier time point goes first) array of data items. Old data is fully replaced with the new one.
	 */
	setData(data: SeriesDataItemTypeMap[TSeriesType][]): void;
	/**
	 * Adds or replaces a new bar
	 * @param bar - a single data item to be added. Time of the new item must be greater or equal to the latest existing time point.
	 * If the new item's time is equal to the last existing item's time, then the existing item is replaced with the new one.
	 */
	update(bar: SeriesDataItemTypeMap[TSeriesType]): void;
	/**
	 * Sets markers for the series
	 * @param data array of series markers. This array should be sorted by time. Several markers with same time are allowed.
	 */
	setMarkers(data: SeriesMarker<Time>[]): void;
	/**
	 * Creates a new price line
	 * @param options - any subset of options
	 */
	createPriceLine(options: PriceLineOptions): IPriceLine;
	/**
	 * Removes an existing price line
	 * @param line to remove
	 */
	removePriceLine(line: IPriceLine): void;
}
/** Interface to chart time scale */
export interface ITimeScaleApi {
	/**
	 * Returns current scroll position of the chart
	 * @returns a distance from the right edge to the latest bar, measured in bars
	 */
	scrollPosition(): number;
	/**
	 * Scrolls the chart to the specified position
	 * @param position - target data position
	 * @param animated - setting this to true makes the chart scrolling smooth and adds animation
	 */
	scrollToPosition(position: number, animated: boolean): void;
	/**
	 * Restores default scroll position of the chart. This process is always animated.
	 */
	scrollToRealTime(): void;
	/**
	 * Returns current visible time range of the chart
	 * @returns - visible range or null if the chart has no data at all
	 */
	getVisibleRange(): TimeRange | null;
	/**
	 * Sets visible range of data
	 * @param range - target visible range of data
	 */
	setVisibleRange(range: TimeRange): void;
	/**
	 * Restores default zooming and scroll position of the time scale
	 */
	resetTimeScale(): void;
	/**
	 * Automatically calculates the visible range to fit all data from all series
	 * This is a momentary operation.
	 */
	fitContent(): void;
	/**
	 * Applies new options to the time scale.
	 * @param options - any subset of options
	 */
	applyOptions(options: DeepPartial<TimeScaleOptions>): void;
	/**
	 * Returns current options
	 * @returns - currently applied options
	 */
	options(): Readonly<TimeScaleOptions>;
}
/** Structure describing layout options */
export interface LayoutOptions {
	/** Background color of the chart area and the scales */
	backgroundColor: string;
	/** Color of a text on the scales */
	textColor: string;
	/** Font size of a text on the scales in pixels  */
	fontSize: number;
	/** Font family of a text on the scales */
	fontFamily: string;
}
/**
 * Structure describing single data item for series of type Line or Area
 */
export interface LineData {
	time: Time;
	/**
	 * Price value of data item
	 */
	value: number;
}
export interface LineStyleOptions {
	color: string;
	lineStyle: LineStyle;
	lineWidth: LineWidth;
	lineType: LineType;
	crosshairMarkerVisible: boolean;
	crosshairMarkerRadius: number;
}
export interface LocalizationOptions {
	/**
	 * Current locale, which will be used for formatting dates.
	 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation}
	 */
	locale: string;
	/**
	 * User-defined function for price formatting. Could be used for some specific cases, that could not be covered with PriceFormat
	 */
	priceFormatter?: PriceFormatterFn;
	/**
	 * User-defined function for time formatting.
	 */
	timeFormatter?: TimeFormatterFn;
	/**
	 * One of predefined options to format time. Ignored if timeFormatter has been specified.
	 */
	dateFormat: DateFormat;
}
export interface MouseEventParams {
	time?: UTCTimestamp | BusinessDay;
	point?: Point;
	seriesPrices: Map<ISeriesApi<SeriesType>, BarPrice | BarPrices>;
	hoveredSeries?: ISeriesApi<SeriesType>;
	hoveredMarkerId?: SeriesMarker<Time>['id'];
}
export interface NonOverlaySeriesSpecificOptions {
	overlay?: false;
	scaleMargins?: undefined;
}
export interface OverlaySeriesSpecificOptions {
	overlay: true;
	scaleMargins?: PriceScaleMargins;
}
export interface Point {
	readonly x: Coordinate;
	readonly y: Coordinate;
}
/**
 * Structure describing series values formatting
 * Fields precision and minMove allow wide customization of formatting
 * @example
 * minMove = 0.01 , precision is not specified. Prices will change like 1.13, 1.14, 1.15 etc.
 * minMove = 0.01 , precision = 3. Prices will change like 1.130, 1.140, 1.150 etc.
 * minMove = 0.05 , precision is not specified. Prices will change like 1.10, 1.15, 1.20
 */
export interface PriceFormatBuiltIn {
	/**
	 *  Enum of possible modes of price formatting
	 * 'price' is the most common choice; it allows customization of precision and rounding of prices
	 * 'volume' uses abbreviation for formatting prices like '1.2K' or '12.67M'
	 * 'percent' uses '%' sign at the end of prices.
	 */
	type: 'price' | 'volume' | 'percent';
	/**
	 * Number of digits after the decimal point.
	 * If it is not set, then its value is calculated automatically based on minMove
	 */
	precision: number;
	/**
	 * Minimal step of the price. This value shouldn't have more decimal digits than the precision
	 */
	minMove: number;
}
export interface PriceFormatCustom {
	type: 'custom';
	/**
	 * User-defined function for price formatting that could be used for some specific cases, that could not be covered with PriceFormatBuiltIn
	 */
	formatter: PriceFormatterFn;
	/**
	 * Minimal step of the price.
	 */
	minMove: number;
}
export interface PriceLineOptions {
	price: BarPrice;
	color: string;
	lineWidth: LineWidth;
	lineStyle: LineStyle;
	axisLabelVisible: boolean;
}
/** Defines margins of the price scale */
export interface PriceScaleMargins {
	/** Top margin in percentages. Must be greater or equal to 0 and less than 100 */
	top: number;
	/** Bottom margin in percentages. Must be greater or equal to 0 and less than 100 */
	bottom: number;
}
/** Structure that describes price scale options */
export interface PriceScaleOptions {
	/** True makes chart calculate the price range automatically based on the visible data range */
	autoScale: boolean;
	/** Mode of the price scale */
	mode: PriceScaleMode;
	/** True inverts the scale. Makes larger values drawn lower. Affects both the price scale and the data on the chart */
	invertScale: boolean;
	/** True value prevents labels on the price scale from overlapping one another by aligning them one below others */
	alignLabels: boolean;
	/** Defines position of the price scale on the chart */
	position: PriceAxisPosition;
	/** Defines price margins for the price scale */
	scaleMargins: PriceScaleMargins;
	/** Set true to draw a border between the price scale and the chart area */
	borderVisible: boolean;
	/** Defines a color of the border between the price scale and the chart area. It is ignored if borderVisible is false */
	borderColor: string;
	/** Indicates whether the price scale displays only full lines of text or partial lines. */
	entireTextOnly: boolean;
}
export interface SeriesDataItemTypeMap {
	Bar: BarData;
	Candlestick: BarData;
	Area: LineData;
	Line: LineData;
	Histogram: HistogramData;
}
export interface SeriesMarker<TimeType> {
	time: TimeType;
	position: SeriesMarkerPosition;
	shape: SeriesMarkerShape;
	color: string;
	id?: string;
}
/**
 * Structure describing options common for all types of series
 */
export interface SeriesOptionsCommon {
	/** Visibility of the label with the latest visible price on the price scale */
	lastValueVisible: boolean;
	/** Title of the series. This label is placed with price axis label */
	title: string;
	scaleGroup: string;
	/** Visibility of the price line. Price line is a horizontal line indicating the last price of the series */
	priceLineVisible: boolean;
	/**
	 *  Enum of possible modes of priceLine source
	 */
	priceLineSource: PriceLineSource;
	/** Width of the price line. Ignored if priceLineVisible is false */
	priceLineWidth: LineWidth;
	/** Color of the price line. Ignored if priceLineVisible is false */
	priceLineColor: string;
	/** Price line style. Suitable for percentage and indexedTo100 scales */
	priceLineStyle: LineStyle;
	/** Formatting settings associated with the series */
	priceFormat: PriceFormat;
	/** Visibility of base line. Suitable for percentage and indexedTo100 scales */
	baseLineVisible: boolean;
	/** Color of the base line in IndexedTo100 mode */
	baseLineColor: string;
	/** Base line width. Suitable for percentage and indexedTo100 scales. Ignored if baseLineVisible is not set */
	baseLineWidth: LineWidth;
	/** Base line style. Suitable for percentage and indexedTo100 scales. Ignored if baseLineVisible is not set */
	baseLineStyle: LineStyle;
}
export interface SeriesOptionsMap {
	Bar: BarSeriesOptions;
	Candlestick: CandlestickSeriesOptions;
	Area: AreaSeriesOptions;
	Line: LineSeriesOptions;
	Histogram: HistogramSeriesOptions;
}
export interface SeriesPartialOptionsMap {
	Bar: BarSeriesPartialOptions;
	Candlestick: CandlestickSeriesPartialOptions;
	Area: AreaSeriesPartialOptions;
	Line: LineSeriesPartialOptions;
	Histogram: HistogramSeriesPartialOptions;
}
export interface TimeRange {
	from: Time;
	to: Time;
}
export interface TimeScaleOptions {
	rightOffset: number;
	barSpacing: number;
	fixLeftEdge: boolean;
	lockVisibleTimeRangeOnResize: boolean;
	rightBarStaysOnScroll: boolean;
	borderVisible: boolean;
	borderColor: string;
	visible: boolean;
	timeVisible: boolean;
	secondsVisible: boolean;
}
/** Structure describing watermark options */
export interface WatermarkOptions {
	/** Color of the watermark */
	color: string;
	/** Visibility of the watermark. If false, other parameters are ignored */
	visible: boolean;
	/** Text of the watermark. Word wrapping is not supported */
	text: string;
	/** Font size in pixels */
	fontSize: number;
	/** Horizontal alignment of the watermark inside the chart area */
	horzAlign: HorzAlign;
	/** Vertical alignment of the watermark inside the chart area */
	vertAlign: VertAlign;
}

export {};
