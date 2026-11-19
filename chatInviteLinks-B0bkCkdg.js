//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { o as customProperties } from "./themeController-2cytOOn0.js";
import { g as getPeerActiveUsernames } from "./objectUrlUtils-5x08MNuO.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, c as joinElementsWith } from "./langPack-BmdJGr44.js";
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as tsNow } from "./tsNow-DUzGGNNb.js";
import { B as rgbaToHsla, E as hexToRgb, M as hslaToString, P as mixColors } from "./state-JPIG5PpJ.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as Button } from "./button-DpTvniRN.js";
import { t as lottieLoader } from "./lottieLoader-B3FXw0K7.js";
import { c as createContextMenu, dt as wrapPeerTitle, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { E as lastItem } from "./getChatMigratedTo-ChhMNXuu.js";
import { H as wrapPlainText } from "./canPollPeerStories-D3HoBvLX.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { i as wrapLeftDuration } from "./wrapDuration-BQgz9hDF.js";
import { G as getChatInviteLinksInitArgs, J as isActiveInvite, K as getChatInvitesLoader, W as ChatInviteLink } from "./appDialogsManager-CXguiKc3.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section, s as appendSectionContent } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent, t as mountSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as StarsAmount } from "./starsAmount-DnM7V5Ca.js";
import { t as ScrollableLoader } from "./scrollableLoader-C020PnPk.js";
import { t as toastError } from "./toastError-BSN4cjN_.js";
import { t as UsernameRow } from "./usernameRow-_ciwjIjr.js";
//#region src/components/sidebarRight/tabs/chatInviteLinks.tsx
var ChatInviteLinks = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { chatId, adminId } = tab.payload;
	const p = tab.payload.p ?? getChatInviteLinksInitArgs(chatId, adminId);
	const actions = {};
	promiseCollector.collect((async () => {
		const loadPromises = [];
		const middleware = tab.middlewareHelper.get();
		const [chat, chatFull] = await Promise.all([tab.managers.appChatsManager.getChat(chatId), p.chatFull]);
		const usernames = getPeerActiveUsernames(chat);
		const invitesLoader = getChatInvitesLoader({
			chatId,
			adminId,
			managers: tab.managers
		});
		tab.container.classList.add("chat-folders-container", "chat-discussion-container");
		let stickerContainer, caption;
		if (!adminId) {
			stickerContainer = document.createElement("div");
			stickerContainer.classList.add("sticker-container");
			caption = document.createElement("div");
			caption.classList.add("caption");
			caption.append(i18n("ChannelLinkInfo"));
		}
		const wrapInviteTitle = (invite) => {
			return invite.title ? wrapEmojiText(invite.title) : wrapPlainText(invite.link.split("://").pop());
		};
		let inviteLink, menuInvite, menuItem, primaryInvite, chatInviteLinkTab;
		const menuButtons = [
			{
				icon: "copy",
				text: "CopyLink",
				onClick: () => inviteLink.copyLink(menuInvite?.link),
				verify: () => !menuInvite?.pFlags?.revoked
			},
			{
				icon: "forward",
				text: "ShareLink",
				onClick: () => {
					const url = menuInvite?.link || inviteLink.url;
					inviteLink.shareLink(url);
				},
				verify: () => !menuInvite ? true : isActiveInvite(menuInvite)
			},
			{
				icon: "edit",
				text: "InviteLinks.Edit",
				onClick: actions.editLink = async () => {
					const _menuItem = menuItem;
					const editTab = tab.slider.createTab(hotReloadGuard.tabs.AppEditChatInviteLinkTab);
					editTab.eventListener.addEventListener("finish", (invite) => {
						_menuItem.destroy();
						_menuItem.row.container.replaceWith(createInviteRow(invite).container);
					});
					await editTab.open({
						chatId,
						invite: menuInvite
					});
					if (chatInviteLinkTab) tab.slider.removeTabFromHistory(chatInviteLinkTab);
				},
				verify: () => menuInvite && !menuInvite.pFlags.revoked
			},
			{
				icon: "delete",
				className: "danger",
				text: "RevokeLink",
				onClick: actions.revokeLink = async () => {
					const _menuItem = menuItem;
					await confirmationPopup({
						titleLangKey: "RevokeLink",
						descriptionLangKey: "RevokeAlert",
						button: {
							langKey: "RevokeButton",
							isDanger: true
						}
					});
					const invite = _menuItem?.invite || primaryInvite;
					let chatInvite;
					try {
						chatInvite = await tab.managers.appChatInvitesManager.editExportedChatInvite({
							chatId,
							link: invite.link,
							revoked: true
						});
					} catch (err) {
						toastError(err, "revoke invite link error");
						return;
					}
					const editedInvite = chatInvite.invite;
					const newInvite = chatInvite.new_invite;
					if (_menuItem) {
						if (newInvite) _menuItem.row.container.replaceWith(createInviteRow(newInvite).container);
						revokedLinksContent.prepend(_menuItem.row.container);
						_menuItem.update(editedInvite);
					} else {
						const row = createInviteRow(editedInvite);
						revokedLinksContent.prepend(row.container);
						primaryInvite = newInvite;
						invitesLoader.remember(primaryInvite?.link);
						inviteLink.setChatInvite(primaryInvite);
					}
					onRevokedLinksUpdate();
					chatInviteLinkTab?.close();
				},
				verify: () => menuInvite ? !menuInvite.pFlags.revoked : !!primaryInvite
			},
			{
				icon: "delete",
				className: "danger",
				text: "DeleteLink",
				onClick: actions.deleteLink = () => {
					const _menuItem = menuItem;
					tab.managers.appChatInvitesManager.deleteExportedChatInvite(chatId, _menuItem.invite.link).then(() => {
						_menuItem.destroy(true);
						onRevokedLinksUpdate();
						chatInviteLinkTab?.close();
					}, (err) => toastError(err, "delete invite link error"));
				},
				verify: () => !!menuInvite?.pFlags?.revoked
			}
		];
		let inviteLinkSection;
		{
			const captionArgs = adminId ? await Promise.all([wrapPeerTitle({ peerId: adminId.toPeerId(false) }), wrapPeerTitle({ peerId: chatId.toPeerId(true) })]) : void 0;
			inviteLink = new ChatInviteLink({
				buttons: menuButtons,
				listenerSetter: tab.listenerSetter,
				actions,
				withSubtitle: true
			});
			inviteLink.subtitle.setAttribute("role", "button");
			if (Modes.a11y) inviteLink.subtitle.tabIndex = 0;
			attachClickEvent(inviteLink.subtitle, () => {
				openLink(primaryInvite);
			}, { listenerSetter: tab.listenerSetter });
			inviteLinkSection = wrapSolidComponent(() => createComponent(Section, {
				name: "InviteLink",
				caption: adminId ? "ManageLinks.Admin.Permanent.Desc" : void 0,
				captionArgs,
				get children() {
					return inviteLink.container;
				}
			}), tab.middlewareHelper.get());
		}
		let additionalLinks, additionalLinksContent;
		additionalLinks = wrapSolidComponent(() => createComponent(Section, {
			name: adminId ? "LinksCreatedByThisAdmin" : "InviteLinks.Additional",
			caption: adminId ? void 0 : "InviteLinks.Description",
			contentProps: { ref: (element) => additionalLinksContent = element }
		}), tab.middlewareHelper.get());
		if (!adminId) {
			const btn = Button("btn-primary btn-transparent primary", {
				icon: "plus",
				text: "CreateNewLink"
			});
			attachClickEvent(btn, () => {
				const editTab = tab.slider.createTab(hotReloadGuard.tabs.AppEditChatInviteLinkTab);
				editTab.eventListener.addEventListener("finish", (chatInvite) => {
					const row = createInviteRow(chatInvite);
					if (primaryInvite) additionalLinksContent.prepend(row.container);
					else additionalLinksContent.firstElementChild.after(row.container);
				});
				editTab.open({ chatId });
			}, { listenerSetter: tab.listenerSetter });
			additionalLinksContent.append(btn);
			additionalLinksContent = appendSectionContent(additionalLinks);
		}
		let adminsLinks;
		if (!adminId) {
			let adminsLinksContent;
			const section = adminsLinks = wrapSolidComponent(() => createComponent(Section, {
				name: "LinksCreatedByOtherAdmins",
				contentProps: { ref: (element) => adminsLinksContent = element }
			}), tab.middlewareHelper.get());
			const promise = (p.adminsInvites || Promise.reject()).then((adminsInvites) => {
				let { admins } = adminsInvites;
				admins = admins.filter((admin) => admin.admin_id.toPeerId(false) !== rootScope.myId);
				if (!admins.length) {
					section.classList.add("hide");
					return;
				}
				const chatlist = hotReloadGuard.appDialogsManager.createChatList();
				const loadPromises = [];
				admins.forEach((admin) => {
					const peerId = admin.admin_id.toPeerId(false);
					const { dom } = hotReloadGuard.appDialogsManager.addDialogNew({
						peerId,
						container: chatlist,
						rippleEnabled: true,
						avatarSize: "abitbigger",
						append: true,
						loadPromises,
						wrapOptions: { middleware: tab.middlewareHelper.get() }
					});
					dom.lastMessageSpan.append(i18n("InviteLinkCount", [admin.invites_count]));
				});
				attachClickEvent(chatlist, (e) => {
					const target = findUpClassName(e.target, "chatlist-chat");
					if (!target) return;
					const peerId = target.dataset.peerId.toPeerId();
					tab.slider.createTab(hotReloadGuard.tabs.AppChatInviteLinksTab).open({
						chatId,
						adminId: peerId.toUserId()
					});
				}, { listenerSetter: tab.listenerSetter });
				adminsLinksContent.append(chatlist);
				return Promise.all(loadPromises);
			}, () => {
				section.remove();
			});
			loadPromises.push(promise);
		}
		let revokedLinks, revokedLinksContent;
		{
			revokedLinks = wrapSolidComponent(() => createComponent(Section, {
				name: "RevokedLinks",
				contentProps: { ref: (element) => revokedLinksContent = element }
			}), tab.middlewareHelper.get());
			const btn = Button("btn-primary btn-transparent danger", {
				icon: "delete",
				text: "DeleteAllRevokedLinks"
			});
			attachClickEvent(btn, async () => {
				await confirmationPopup({
					titleLangKey: "DeleteAllRevokedLinks",
					descriptionLangKey: "ManageLinks.DeleteAll.Confirm",
					button: {
						langKey: "Delete",
						isDanger: true
					}
				});
				const toggle = toggleDisability(btn, true);
				try {
					await tab.managers.appChatInvitesManager.deleteRevokedExportedChatInvites(chatId, adminId);
				} catch (err) {
					toastError(err, "delete revoked links error");
					return;
				} finally {
					toggle();
				}
				invitesLoader.endRevoked();
				Array.from(revokedLinksContent.children).forEach((el) => {
					invitesMap.get(el).destroy(true);
				});
				onRevokedLinksUpdate();
			}, { listenerSetter: tab.listenerSetter });
			revokedLinksContent.append(btn);
			revokedLinksContent = appendSectionContent(revokedLinks);
		}
		tab.scrollable.append(...[
			stickerContainer,
			caption,
			inviteLinkSection,
			additionalLinks,
			adminsLinks,
			revokedLinks
		].filter(Boolean));
		const openLink = (invite) => {
			const detailTab = chatInviteLinkTab = tab.slider.createTab(hotReloadGuard.tabs.AppChatInviteLinkTab);
			detailTab.eventListener.addEventListener("close", () => {
				chatInviteLinkTab = menuItem = menuInvite = void 0;
			});
			detailTab.open({
				chatId,
				chatInvite: invite,
				menuButtons,
				actions,
				onUpdate: menuItem?.update
			});
		};
		attachClickEvent(tab.scrollable.container, (e) => {
			const container = findUpClassName(e.target, "is-link");
			if (!container) return;
			menuItem = invitesMap.get(container);
			menuInvite = menuItem.invite;
			openLink(menuInvite);
		}, { listenerSetter: tab.listenerSetter });
		createContextMenu({
			buttons: menuButtons,
			listenTo: tab.scrollable.container,
			findElement: (e) => {
				const container = findUpClassName(e.target, "is-link");
				if (container) {
					menuItem = invitesMap.get(container);
					menuInvite = menuItem.invite;
				}
				return container;
			},
			onClose: () => menuItem = menuInvite = void 0,
			middleware,
			listenerSetter: tab.listenerSetter
		});
		const loadAnimationPromise = stickerContainer && p.animationData.then(async (cb) => {
			const player = await cb({
				container: stickerContainer,
				loop: true,
				autoplay: true,
				width: 120,
				height: 120
			});
			return lottieLoader.waitForFirstFrame(player);
		});
		const invitesMap = /* @__PURE__ */ new Map();
		const updateCallbacks = /* @__PURE__ */ new Set();
		const createInviteRow = (invite) => {
			invitesLoader.remember(invite.link);
			let title, subtitle, media;
			let priceElement, subtitleRight;
			if (invite.subscription_pricing) {
				priceElement = StarsAmount({ stars: invite.subscription_pricing.amount });
				subtitleRight = i18n("Stars.Subscriptions.PerMonth");
			}
			const mounted = mountSolidComponent(() => createComponent(UsernameRow, {
				isLink: true,
				get icon() {
					return invite.subscription_pricing ? "link_paid" : "limit_link";
				},
				get color() {
					return invite.subscription_pricing ? "green" : void 0;
				},
				get title() {
					return wrapInviteTitle(invite);
				},
				titleRight: priceElement,
				subtitleRight,
				titleRef: (element) => title = element,
				subtitleRef: (element) => subtitle = element,
				mediaRef: (element) => media = element
			}), middleware);
			const row = {
				container: mounted.element,
				title,
				subtitle,
				media
			};
			if (!invite.expire_date && !invite.pFlags.revoked && !invite.subscription_pricing) delete row.media.dataset.color;
			let onClean;
			const destroy = (unmount) => {
				onClean?.();
				invitesMap.delete(row.container);
				mounted.dispose();
				if (unmount) row.container.remove();
			};
			const update = (newInvite) => {
				if (newInvite) invite = cache.invite = newInvite;
				const elements = [];
				const joined = invite.usage || 0;
				const requested = invite.requested || 0;
				const time = tsNow(true);
				const expireDate = invite.expire_date;
				const isExpired = expireDate && expireDate <= time;
				const isLimit = joined && joined >= invite.usage_limit;
				const timeLeft = expireDate ? Math.max(0, expireDate - time) : void 0;
				if (invite.pFlags.revoked) {
					elements.push(i18n("InviteLink.JoinedRevoked"), i18n("ExportedInvitation.Status.Revoked"));
					row.media.dataset.color = "archive";
					if (circle) {
						circle.parentElement.remove();
						circle = void 0;
					}
					onClean?.();
				} else if (joined) {
					elements.push(i18n("InviteLink.JoinedNew", [joined]));
					if (isLimit) {
						elements.push(i18n("InviteLinks.LimitReached"));
						row.media.dataset.color = "red";
					} else if (invite.usage_limit) elements.push(i18n("PeopleJoinedRemaining", [invite.usage_limit - joined]));
					else if (requested) elements.push(i18n("JoinRequests", [requested]));
				} else if (requested) elements.push(i18n("JoinRequests", [requested]));
				else if (invite.usage_limit && !isExpired) elements.push(i18n("CanJoin", [invite.usage_limit]));
				else elements.push(i18n(isExpired ? "InviteLink.JoinedRevoked" : "Chat.VoiceChat.JoinLink.Participants_ZeroValueHolder"));
				if (!invite.pFlags.revoked && expireDate) {
					if (!isExpired) elements.push(i18n("InviteLink.Sticker.TimeLeft", [wrapLeftDuration(timeLeft)]));
					else {
						row.media.dataset.color = "red";
						elements.push(i18n("ExportedInvitation.Status.Expired"));
						onClean?.();
					}
				}
				if (!invite.pFlags.revoked && (expireDate && !isExpired || invite.usage_limit && !isLimit)) {
					const limitProgress = invite.usage_limit ? joined / invite.usage_limit : void 0;
					const timeProgress = expireDate ? 1 - timeLeft / (expireDate - (invite.start_date || invite.date)) : void 0;
					const progress = Math.max(limitProgress ?? 0, timeProgress ?? 0);
					const color1 = hexToRgb(customProperties.getProperty("green-color"));
					const color2 = hexToRgb(customProperties.getProperty("danger-color"));
					const mixedColor = mixColors(color2, color1, progress);
					const hsla = rgbaToHsla(...mixedColor);
					hsla.s = Math.max(55, hsla.s);
					row.media.style.setProperty("--color", hslaToString(hsla));
					if (circle) {
						totalLength ?? (totalLength = circle.getTotalLength());
						circle.style.strokeDasharray = `${totalLength * (1 - progress)}, ${totalLength}`;
						if (isExpired) {
							const c = () => {
								_circle.parentElement.remove();
							};
							const _circle = circle;
							circle = void 0;
							setTimeout(c, 400);
						}
					}
				}
				row.subtitle.replaceChildren(...joinElementsWith(elements, " • "));
			};
			const cache = {
				row,
				invite,
				update,
				destroy
			};
			invitesMap.set(row.container, cache);
			let circle, totalLength = 146.70338439941406;
			if ((invite.expire_date || invite.usage_limit) && isActiveInvite(invite)) {
				if (invite.expire_date) {
					onClean = () => {
						updateCallbacks.delete(update);
					};
					updateCallbacks.add(update);
					middleware.onDestroy(onClean);
				}
				row.media.insertAdjacentHTML("beforeend", `
          <svg class="usernames-username-icon-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 51 51">
            <circle class="usernames-username-icon-circle" cx="25.5" cy="25.5" r="23.5"/>
          </svg>
        `);
				circle = row.media.lastElementChild.firstElementChild;
			}
			update();
			return row;
		};
		const onRevokedLinksUpdate = () => {
			revokedLinks.classList.toggle("hide", !revokedLinksContent.childElementCount);
		};
		const appendInvites = (revoked, invites) => {
			if (!invites?.length) return;
			(revoked ? revokedLinksContent : additionalLinksContent).append(...invites.map((invite) => createInviteRow(invite).container));
			if (revoked) onRevokedLinksUpdate();
		};
		const watchActiveLinksEnd = () => {
			const end = document.createElement("div");
			additionalLinksContent.after(end);
			let loading = false;
			const observer = new IntersectionObserver((entries) => {
				if (loading || !lastItem(entries).isIntersecting) return;
				loading = true;
				invitesLoader.loadMore(false).then((invites) => {
					loading = false;
					if (!middleware()) return;
					appendInvites(false, invites);
					observer.unobserve(end);
					if (invitesLoader.isEnd(false)) {
						observer.disconnect();
						end.remove();
					} else observer.observe(end);
				}, () => {
					loading = false;
				});
			}, {
				root: tab.scrollable.container,
				rootMargin: `0px 0px ${tab.scrollable.onScrollOffset}px`
			});
			observer.observe(end);
			middleware.onDestroy(() => observer.disconnect());
		};
		const loadLinksPromise = Promise.all([p.invites, p.invitesRevoked]).then(([chatInvites, chatInvitesRevoked]) => {
			if (adminId) primaryInvite = chatInvites.invites[0];
			else if (!usernames.length && chatFull._ !== "communityFull") primaryInvite = chatFull.exported_invite;
			inviteLink.setChatInvite(primaryInvite || usernames[0]);
			invitesLoader.remember(primaryInvite?.link);
			appendInvites(false, invitesLoader.takePage(false, chatInvites));
			appendInvites(true, invitesLoader.takePage(true, chatInvitesRevoked));
			onRevokedLinksUpdate();
			if (!invitesLoader.isEnd(false)) watchActiveLinksEnd();
			if (!invitesLoader.isEnd(true)) new ScrollableLoader({
				scrollable: tab.scrollable,
				getPromise: async () => {
					const invites = await invitesLoader.loadMore(true);
					if (!middleware()) return true;
					appendInvites(true, invites);
					return invitesLoader.isEnd(true);
				}
			});
			const update = () => {
				updateCallbacks.forEach((cb) => cb());
			};
			const updateInterval = setInterval(update, 1e3);
			middleware.onDestroy(() => {
				invitesMap.forEach(({ destroy }) => destroy());
				clearInterval(updateInterval);
			});
			tab.listenerSetter.add(rootScope)("theme_changed", () => {
				invitesMap.forEach(({ update }) => update());
			});
		});
		loadPromises.push(loadAnimationPromise, loadLinksPromise);
		await Promise.all(loadPromises);
	})());
	return null;
};
//#endregion
export { ChatInviteLinks as default };
