//# allFunctionsCalledOnLoad
import { r as IS_APPLE } from "./userAgent-ByGXcznk.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, b as createResource, i as For, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { o as useAppSettings } from "./liteMode-DeLStZfQ.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { t as InlineSelect } from "./inlineSelect-CUZ60ySC.js";
var keyboardShortcuts_module_default = {
	keys: "_keys_17ixq_1",
	kbd: "_kbd_17ixq_11",
	plus: "_plus_17ixq_27",
	or: "_or_17ixq_33"
};
//#endregion
//#region src/components/sidebarLeft/tabs/keyboardShortcuts.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span>`);
var _tmpl$2 = /*#__PURE__*/ template(`<span>+`);
var _tmpl$3 = /*#__PURE__*/ template(`<span>/`);
var _tmpl$4 = /*#__PURE__*/ template(`<span>—`);
var KEY_LABELS = {
	ctrl: {
		mac: "⌘",
		pc: "Ctrl"
	},
	shift: {
		mac: "⇧",
		pc: "Shift"
	},
	alt: {
		mac: "⌥",
		pc: "Alt"
	},
	meta: {
		mac: "⌘",
		pc: "Win"
	},
	enter: {
		mac: "↵",
		pc: "Enter"
	},
	esc: {
		mac: "Esc",
		pc: "Esc"
	},
	space: {
		mac: "Space",
		pc: "Space"
	},
	up: {
		mac: "↑",
		pc: "↑"
	},
	down: {
		mac: "↓",
		pc: "↓"
	},
	left: {
		mac: "←",
		pc: "←"
	},
	right: {
		mac: "→",
		pc: "→"
	},
	plus: {
		mac: "+",
		pc: "+"
	},
	minus: {
		mac: "−",
		pc: "−"
	}
};
var INLINE_KEYS = {
	next: () => langPack_default.isRTL() ? "left" : "right",
	previous: () => langPack_default.isRTL() ? "right" : "left"
};
function labelFor(key) {
	const lookup = KEY_LABELS[INLINE_KEYS[key]?.() ?? key.toLowerCase()];
	if (lookup) return IS_APPLE ? lookup.mac : lookup.pc;
	return key.length === 1 ? key.toUpperCase() : key;
}
var Kbd = (props) => (() => {
	var _el$ = _tmpl$();
	insert(_el$, () => props.children);
	createRenderEffect(() => className(_el$, keyboardShortcuts_module_default.kbd));
	return _el$;
})();
var KeyCombo = (props) => (() => {
	var _el$2 = _tmpl$();
	insert(_el$2, createComponent(For, {
		get each() {
			return props.keys;
		},
		children: (key, index) => [createComponent(Show, {
			get when() {
				return index() > 0;
			},
			get children() {
				var _el$3 = _tmpl$2();
				createRenderEffect(() => className(_el$3, keyboardShortcuts_module_default.plus));
				return _el$3;
			}
		}), createComponent(Kbd, { get children() {
			return labelFor(key);
		} })]
	}));
	createRenderEffect(() => className(_el$2, keyboardShortcuts_module_default.keys));
	return _el$2;
})();
var KeyAlternatives = (props) => (() => {
	var _el$4 = _tmpl$();
	insert(_el$4, createComponent(For, {
		get each() {
			return props.combos;
		},
		children: (combo, index) => [createComponent(Show, {
			get when() {
				return index() > 0;
			},
			get children() {
				var _el$5 = _tmpl$3();
				createRenderEffect(() => className(_el$5, keyboardShortcuts_module_default.or));
				return _el$5;
			}
		}), createComponent(KeyCombo, { keys: combo })]
	}));
	createRenderEffect(() => className(_el$4, keyboardShortcuts_module_default.keys));
	return _el$4;
})();
var ShortcutRow = (props) => createComponent(Row, { get children() {
	return [createComponent(Row.Title, {
		get titleRight() {
			return props.keys;
		},
		titleRightSecondary: true,
		get children() {
			return i18n(props.action);
		}
	}), createComponent(Show, {
		get when() {
			return props.hint;
		},
		get children() {
			return createComponent(Row.Subtitle, { get children() {
				return i18n(props.hint);
			} });
		}
	})];
} });
var FormattingSection = () => createComponent(Section, {
	name: "KeyboardShortcuts.Section.Formatting",
	caption: "KeyboardShortcuts.Section.Formatting.Caption",
	get children() {
		return [
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.Bold",
				get keys() {
					return createComponent(KeyCombo, { keys: ["ctrl", "B"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.Italic",
				get keys() {
					return createComponent(KeyCombo, { keys: ["ctrl", "I"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.Underline",
				get keys() {
					return createComponent(KeyCombo, { keys: ["ctrl", "U"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.Strikethrough",
				get keys() {
					return createComponent(KeyCombo, { keys: ["ctrl", "S"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.Monospace",
				get keys() {
					return createComponent(KeyCombo, { keys: IS_APPLE ? [
						"ctrl",
						"shift",
						"M"
					] : ["ctrl", "M"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.Spoiler",
				get keys() {
					return createComponent(KeyCombo, { keys: ["ctrl", "P"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.Link",
				get keys() {
					return createComponent(KeyCombo, { keys: ["ctrl", "K"] });
				}
			})
		];
	}
});
var SendShortcutRow = () => {
	const [appSettings, setAppSettings] = useAppSettings();
	const [rowEl, setRowEl] = createSignal();
	const [isOpen, setIsOpen] = createSignal(false);
	const enterLabel = () => createComponent(KeyCombo, { keys: ["enter"] });
	const ctrlEnterLabel = () => createComponent(KeyCombo, { keys: ["ctrl", "enter"] });
	const options = [{
		value: "enter",
		label: enterLabel
	}, {
		value: "ctrlEnter",
		label: ctrlEnterLabel
	}];
	return createComponent(Row, {
		ref: setRowEl,
		clickable: () => setIsOpen(true),
		get children() {
			return [createComponent(Row.Title, { get children() {
				return i18n("KeyboardShortcuts.Action.Send");
			} }), createComponent(Row.RightContent, { get children() {
				return createComponent(InlineSelect, {
					get value() {
						return appSettings.sendShortcut || "enter";
					},
					get isOpen() {
						return isOpen();
					},
					onClose: () => setIsOpen(false),
					options,
					onChange: (value) => setAppSettings("sendShortcut", value),
					get parent() {
						return rowEl();
					}
				});
			} })];
		}
	});
};
var NewLineRow = () => {
	const [appSettings] = useAppSettings();
	const keys = () => appSettings.sendShortcut === "ctrlEnter" ? ["enter"] : ["shift", "enter"];
	return createComponent(Row, { get children() {
		return createComponent(Row.Title, {
			get titleRight() {
				return createComponent(KeyCombo, { get keys() {
					return keys();
				} });
			},
			titleRightSecondary: true,
			get children() {
				return i18n("KeyboardShortcuts.Action.NewLine");
			}
		});
	} });
};
var MessagesSection = () => createComponent(Section, {
	name: "KeyboardShortcuts.Section.Messages",
	caption: "KeyboardShortcuts.Section.Messages.Caption",
	get children() {
		return [
			createComponent(SendShortcutRow, {}),
			createComponent(NewLineRow, {}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.JumpToInputStart",
				get keys() {
					return createComponent(KeyCombo, { keys: ["ctrl", "PageUp"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.JumpToInputEnd",
				get keys() {
					return createComponent(KeyCombo, { keys: ["ctrl", "PageDown"] });
				}
			})
		];
	}
});
var ChatSection = () => createComponent(Section, {
	name: "KeyboardShortcuts.Section.Chat",
	get children() {
		return [
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.EditLast",
				hint: "KeyboardShortcuts.Hint.WhenInputEmpty",
				get keys() {
					return createComponent(KeyCombo, { keys: ["up"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.ReplyToPrevious",
				get keys() {
					return createComponent(KeyCombo, { keys: ["ctrl", "up"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.NextChat",
				get keys() {
					return createComponent(KeyCombo, { keys: ["alt", "down"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.PreviousChat",
				get keys() {
					return createComponent(KeyCombo, { keys: ["alt", "up"] });
				}
			})
		];
	}
});
var NavigationSection = () => createComponent(Section, {
	name: "KeyboardShortcuts.Section.Navigation",
	get children() {
		return [
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.OpenSearch",
				get keys() {
					return createComponent(KeyCombo, { keys: ["ctrl", "F"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.SavedMessages",
				get keys() {
					return createComponent(KeyCombo, { keys: ["ctrl", "0"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.ClosePopup",
				get keys() {
					return createComponent(KeyCombo, { keys: ["esc"] });
				}
			})
		];
	}
});
var MediaViewerSection = () => createComponent(Section, {
	name: "KeyboardShortcuts.Section.MediaViewer",
	get children() {
		return [
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.NextMedia",
				get keys() {
					return createComponent(KeyCombo, { keys: ["next"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.PreviousMedia",
				get keys() {
					return createComponent(KeyCombo, { keys: ["previous"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.ZoomIn",
				get keys() {
					return createComponent(KeyCombo, { keys: ["ctrl", "plus"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.ZoomOut",
				get keys() {
					return createComponent(KeyCombo, { keys: ["ctrl", "minus"] });
				}
			})
		];
	}
});
var StoriesSection = () => createComponent(Section, {
	name: "KeyboardShortcuts.Section.Stories",
	get children() {
		return [
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.NextStory",
				get keys() {
					return createComponent(KeyCombo, { keys: ["next"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.PreviousStory",
				get keys() {
					return createComponent(KeyCombo, { keys: ["previous"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.PlayPauseStory",
				get keys() {
					return createComponent(KeyCombo, { keys: ["space"] });
				}
			}),
			createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.CloseStories",
				get keys() {
					return createComponent(KeyCombo, { keys: ["down"] });
				}
			})
		];
	}
});
var MediaEditorSection = () => createComponent(Section, {
	name: "KeyboardShortcuts.Section.MediaEditor",
	get children() {
		return [createComponent(ShortcutRow, {
			action: "KeyboardShortcuts.Action.Undo",
			get keys() {
				return createComponent(KeyCombo, { keys: ["ctrl", "Z"] });
			}
		}), createComponent(ShortcutRow, {
			action: "KeyboardShortcuts.Action.Redo",
			get keys() {
				return createComponent(KeyAlternatives, { combos: [[
					"ctrl",
					"shift",
					"Z"
				], ["ctrl", "Y"]] });
			}
		})];
	}
});
var OtherSection = () => {
	const [passcode] = createResource(() => rootScope.managers.appStateManager.getState().then((state) => state?.settings?.passcode));
	const lockKeys = () => {
		const p = passcode();
		if (!p?.enabled || !p?.lockShortcutEnabled || !p?.lockShortcut?.length) return void 0;
		return [...p.lockShortcut, "L"];
	};
	return createComponent(Section, {
		name: "KeyboardShortcuts.Section.Other",
		get children() {
			return createComponent(ShortcutRow, {
				action: "KeyboardShortcuts.Action.LockPasscode",
				get hint() {
					return lockKeys() ? void 0 : "KeyboardShortcuts.Hint.LockPasscodeNotSet";
				},
				get keys() {
					return createComponent(Show, {
						get when() {
							return lockKeys();
						},
						get fallback() {
							return (() => {
								var _el$6 = _tmpl$4();
								createRenderEffect(() => className(_el$6, keyboardShortcuts_module_default.or));
								return _el$6;
							})();
						},
						get children() {
							return createComponent(KeyCombo, { get keys() {
								return lockKeys();
							} });
						}
					});
				}
			});
		}
	});
};
var KeyboardShortcutsTab = () => [
	createComponent(FormattingSection, {}),
	createComponent(MessagesSection, {}),
	createComponent(ChatSection, {}),
	createComponent(NavigationSection, {}),
	createComponent(MediaViewerSection, {}),
	createComponent(StoriesSection, {}),
	createComponent(MediaEditorSection, {}),
	createComponent(OtherSection, {})
];
//#endregion
export { KeyboardShortcutsTab as default };
