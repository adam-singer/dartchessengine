function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
 }
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.i_10 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC29) && f.$call$2(key, $.index(this._values, i));
  }
 },
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC29) && f.$call$2(key, $.index(this._values, i));
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) return;
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  if ($.index(this._keys, index) == null || $.index(this._keys, index) === $.CTC29) this._numberOfEntries = $.add(this._numberOfEntries, 1);
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number') return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || (oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || (oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListFactory_List(newCapacity);
  var t1 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
  for (var i = 0; i < capacity; ++i) {
    t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    if (t2 == null || t2 === $.CTC29) continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t3 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t3);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListFactory_List(newCapacity);
      var t1 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t1, ({E: 'V'}));
      this._values = t1;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC29) continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  $.gtB(this._numberOfDeleted, numberOfFree) && this._grow$1($.get$length(this._keys));
 },
 _probeForLookup$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  for (var numberOfProbes = 1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null) return -1;
    if ($.eqB(existingKey, key)) return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(1, key, hash, 0, 0, 0);
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._probeForAdding$1$bailout(2, numberOfProbes, hash, key, insertionIndex, t1);
    var t2 = t1.length;
    if (hash < 0 || hash >= t2) throw $.ioore(hash);
    t1 = t1[hash];
    if (t1 == null) {
      if (insertionIndex < 0) return hash;
      return insertionIndex;
    }
    if ($.eqB(t1, key)) return hash;
    if (insertionIndex < 0 && $.CTC29 === t1) insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(3, key, numberOfProbes0, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      hash = env1;
      break;
    case 2:
      numberOfProbes = env0;
      hash = env1;
      key = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 3:
      key = env0;
      numberOfProbes0 = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
    case 2:
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!true) break L0;
            var t1 = this._keys;
          case 2:
            state = 0;
            var existingKey = $.index(t1, hash);
            if (existingKey == null) {
              if ($.ltB(insertionIndex, 0)) return hash;
              return insertionIndex;
            }
            if ($.eqB(existingKey, key)) return hash;
            if ($.ltB(insertionIndex, 0) && $.CTC29 === existingKey) insertionIndex = hash;
            var numberOfProbes0 = numberOfProbes + 1;
            hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
          case 3:
            state = 0;
            numberOfProbes = numberOfProbes0;
        }
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(8);
  this._keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
 },
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0)) throw $.iae(value);
  var t2 = t1.length;
  if (value < 0 || value >= t2) throw $.ioore(value);
  t1[value] = value;
 },
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
 },
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._advance$0$bailout(1, t1);
  var length$ = t1.length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$) break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    var t3 = t1.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    entry = t1[t2];
  } while ((entry == null || entry === $.CTC29));
 },
 _advance$0$bailout: function(state, t1) {
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$)) break;
    entry = $.index(t1, this._nextValidIndex);
  } while ((entry == null || entry === $.CTC29));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t2 = this._nextValidIndex;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t2 = t1[t2];
  this._advance$0();
  return t2;
 },
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.hasNext$0$bailout(1, t1, t2);
  var t3 = t2.length;
  if (t1 >= t3) return false;
  if (t1 !== (t1 | 0)) throw $.iae(t1);
  if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
  t2[t1] === $.CTC29 && this._advance$0();
  return this._nextValidIndex < t2.length;
 },
 hasNext$0$bailout: function(state, t1, t2) {
  if ($.geB(t1, $.get$length(t2))) return false;
  $.index(t2, this._nextValidIndex) === $.CTC29 && this._advance$0();
  return $.lt(this._nextValidIndex, $.get$length(t2));
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["value=", "key?"],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_list"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._list);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._map);
 },
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
 },
 forEach$1: function(f) {
  $.forEach(this._list, new $.LinkedHashMapImplementation_forEach__(f));
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.index_10 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.index_11 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
 },
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null) return;
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0)) throw $.iae(key);
    var t2 = t1.length;
    if (key < 0 || key >= t2) throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0)) throw $.iae(key);
    var t3 = t1.length;
    if (key < 0 || key >= t3) throw $.ioore(key);
    t1[key] = t2;
  }
 },
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true) $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: 'KeyValuePair<K, V>'}));
  this._list = t1;
 },
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._element;
 },
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
 },
 _asNonSentinelEntry$0: function() {
  return this;
 },
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._element;
 },
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this._previous, this);
 },
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
 }
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC28);
 },
 _asNonSentinelEntry$0: function() {
  return;
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC28);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 }
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_element());
    entry = nextEntry;
  }
 },
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
 },
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
 },
 get$length: function() {
  var t1 = ({});
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
 },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
 },
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
 },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  this._sentinel = t1;
 },
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) return '';
  if ($.get$length(this._buffer) === 1) return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this._buffer = t1;
  this._length = 0;
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true) return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number') return this.add$1$bailout(1, str, t1);
  var t2 = $.get$length(str);
  if (typeof t2 !== 'number') return this.add$1$bailout(2, t1, t2);
  this._length = t1 + t2;
  return this;
 },
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true) return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t2 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t2);
      return this;
  }
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null) return;
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 }
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
 }
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true) return false;
  if (!(this._next == null)) return true;
  this._next = this._re.firstMatch$1(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  }
  return true;
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var next = this._next;
  this._next = null;
  return next;
 }
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.NoMoreElementsException$());
  var value = (this.list[this.i]);
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
 },
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
 },
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1);
  return t1 < (this.list.length);
 },
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, (this.list.length));
 }
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
 }
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object"
};

$$.StringMatch = {"":
 ["pattern?", "str", "_lib0_start"],
 super: "Object",
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 }
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.Primitives_objectToString(this);
 }
};

$$.IndexOutOfRangeException = {"":
 ["_index"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._index);
 }
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(2, t1, sb);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
 },
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      sb = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      sb = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null) return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      var actualParameters = sb.toString$0();
      sb = $.StringBufferImpl$('');
      for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      var formalParameters = sb.toString$0();
      t1 = this._functionName;
      return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
  }
 }
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
 }
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
 }
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
 }
};

$$.BadNumberFormatException = {"":
 ["_s"],
 super: "Object",
 toString$0: function() {
  return 'BadNumberFormatException: \'' + $.S(this._s) + '\'';
 }
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null) return this.get$exceptionName();
  return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
 }
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
 }
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
 }
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
 }
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
 }
};

$$.Game = {"":
 ["_ratio", "_ctx", "canvas", "pieces!", "board?", "engine?"],
 super: "Object",
 anim$1: function(i) {
  this.draw$0();
  $.window().requestAnimationFrame$1(this.get$anim());
 },
 get$anim: function() { return new $.BoundClosure(this, 'anim$1'); },
 draw$0: function() {
  this.board.draw$0();
  $.forEach(this.pieces, new $.Game_draw_anon());
 },
 Game$2: function(canvas, engine) {
  var t1 = this.canvas;
  this._ctx = t1.getContext$1('2d');
  var t2 = this._ctx;
  this.board = $.Board$0(t2, this.engine, t1.get$height(), t1.get$width());
  var t3 = this.board;
  this._ratio = t3.get$ratio();
  this.pieces = [];
  var t4 = this.pieces;
  var t5 = this._ratio;
  $.add$1(t4, $.Piece$(t2, t5, 'White King', $.PieceData_wk, 'e1'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black King', $.PieceData_bk, 'e8'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Queen', $.PieceData_wq, 'd1'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Queen', $.PieceData_bq, 'd8'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Bishop', $.PieceData_wb, 'c1'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Bishop', $.PieceData_wb, 'f1'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Bishop', $.PieceData_bb, 'c8'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Bishop', $.PieceData_bb, 'f8'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Knight', $.PieceData_wn, 'b1'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Knight', $.PieceData_wn, 'g1'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Knight', $.PieceData_bn, 'b8'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Knight', $.PieceData_bn, 'g8'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Rook', $.PieceData_wr, 'a1'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Rook', $.PieceData_wr, 'h1'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Rook', $.PieceData_br, 'a8'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Rook', $.PieceData_br, 'h8'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Pawn', $.PieceData_wp, 'a2'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Pawn', $.PieceData_wp, 'b2'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Pawn', $.PieceData_wp, 'c2'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Pawn', $.PieceData_wp, 'd2'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Pawn', $.PieceData_wp, 'e2'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Pawn', $.PieceData_wp, 'f2'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Pawn', $.PieceData_wp, 'g2'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'White Pawn', $.PieceData_wp, 'h2'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Pawn', $.PieceData_bp, 'a7'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Pawn', $.PieceData_bp, 'b7'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Pawn', $.PieceData_bp, 'c7'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Pawn', $.PieceData_bp, 'd7'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Pawn', $.PieceData_bp, 'e7'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Pawn', $.PieceData_bp, 'f7'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Pawn', $.PieceData_bp, 'g7'));
  $.add$1(this.pieces, $.Piece$(t2, t5, 'Black Pawn', $.PieceData_bp, 'h7'));
  t3.set$pieces(this.pieces);
  $.add$1(t1.get$on().get$mouseDown(), new $.anon0(this));
 }
};

$$.Board0 = {"":
 ["_boxColor2", "_boxColor1", "_highlightColor", "piecemoves", "squares", "highlightsquares", "selectedSquare!", "height=", "width=", "ratio?", "pieces!", "ctx?", "engine?"],
 super: "Object",
 draw$0: function() {
  $.forEach(this.squares, new $.Board_draw_anon(this));
 },
 selectSquare$2: function(x, y) {
  var t1 = ({});
  var t2 = this.selectedSquare == null;
  var t3 = this.squares;
  if (t2) $.forEach(t3, new $.Board_selectSquare_anon(this, x, y));
  else {
    t1.selectedSquareMoves_1 = true;
    t1.tmp_selectedSquare_2 = null;
    $.forEach(t3, new $.Board_selectSquare_anon0(this, x, t1, y));
    if ($.eqB(t1.selectedSquareMoves_1, false) && !(t1.tmp_selectedSquare_2 == null)) this.selectedSquare = t1.tmp_selectedSquare_2;
    else {
      t1.dest_square_3 = null;
      $.forEach(t3, new $.Board_selectSquare_anon1(x, t1, y));
      if (!(t1.dest_square_3 == null)) {
        t2 = this.engine;
        var validMove = t2.IsValidMove$4(this.selectedSquare.get$col(), this.selectedSquare.get$row(), t1.dest_square_3.get$col(), t1.dest_square_3.get$row());
        $.print('validMove = ' + $.S(validMove));
        if (validMove === true) {
          t2.MovePiece$4(this.selectedSquare.get$col(), this.selectedSquare.get$row(), t1.dest_square_3.get$col(), t1.dest_square_3.get$row());
          $.print('selectedSquare.col = ' + $.S(this.selectedSquare.get$col()));
          $.print('selectedSquare.row = ' + $.S(this.selectedSquare.get$row()));
          $.print('dest_square.col = ' + $.S(t1.dest_square_3.get$col()));
          $.print('dest_square.row = ' + $.S(t1.dest_square_3.get$row()));
          t2 = this.selectedSquare.get$col();
          if (typeof t2 !== 'number') throw $.iae(t2);
          ++t2;
          t3 = this.selectedSquare.get$row();
          if (typeof t3 !== 'number') throw $.iae(t3);
          var src_sq = $.Utils_toSquare(t2, 8 - t3);
          t2 = t1.dest_square_3.get$col();
          if (typeof t2 !== 'number') throw $.iae(t2);
          ++t2;
          var t4 = t1.dest_square_3.get$row();
          if (typeof t4 !== 'number') throw $.iae(t4);
          var dest_sq = $.Utils_toSquare(t2, 8 - t4);
          $.print('src_sq = ' + $.S(src_sq));
          $.print('dest_sq = ' + $.S(dest_sq));
          $.forEach(this.pieces, new $.Board_selectSquare_anon2(dest_sq, src_sq));
          this.selectedSquare = null;
        }
      }
    }
  }
 },
 highlight$2: function(col, row) {
  var t1 = this.squares;
  t1.containsKey$1($.S(col) + ' ' + $.S(row)) === true && $.index(t1, $.S(col) + ' ' + $.S(row)).set$highlighted(true);
 },
 Board$4: function(ctx, engine, height, width) {
  this.ratio = $.toInt($.div(this.height, this.width));
  this.highlightsquares = $.makeLiteralMap([]);
  this.squares = $.makeLiteralMap([]);
  var t1 = this.ratio;
  if (typeof t1 !== 'number') throw $.iae(t1);
  var sz = 50 * t1;
  for (t1 = this.squares, t2 = this._boxColor1, t3 = this._boxColor2, j = null, i = 0; i < 8; ++i) {
    for (var t4 = i * sz, j = 0; j < 8; ++j) {
      var t5 = $.mod(i + j, 2);
      if (t5 === 1) $.indexSet(t1, $.S(i) + ' ' + $.S(j), $.BoardSquare$(i, j, t4, j * sz, sz, sz, t2, false, 'rgba(207, 247, 0, 0.9)'));
      else {
        if (t5 === 0) $.indexSet(t1, $.S(i) + ' ' + $.S(j), $.BoardSquare$(i, j, t4, j * sz, sz, sz, t3, false, 'rgba(207, 247, 0, 0.9)'));
      }
    }
  }
  var i, t3, t2, j;
 }
};

$$.BoardSquare = {"":
 ["highlightFill", "highlighted!", "fill", "h", "w", "y", "x", "col?", "row?"],
 super: "Object",
 contains$2: function(mx, my) {
  var t1 = this.x;
  if ($.ltB(t1, mx)) {
    if ($.gtB($.add(t1, this.w), mx)) {
      t1 = this.y;
      t1 = $.ltB(t1, my) && $.gtB($.add(t1, this.h), my);
    } else t1 = false;
  } else t1 = false;
  return t1;
 },
 draw$1: function(ctx) {
  ctx.set$fillStyle(this.fill);
  var t1 = this.x;
  var t2 = this.y;
  var t3 = this.w;
  var t4 = this.h;
  ctx.fillRect$4(t1, t2, t3, t4);
  if (this.highlighted === true) {
    ctx.set$fillStyle(this.highlightFill);
    ctx.fillRect$4(t1, t2, t3, t4);
  }
 }
};

$$.Piece0 = {"":
 ["name", "sz", "data", "sq=", "ctx?", "ratio?", "img"],
 super: "Object",
 draw$0: function() {
  var t1 = $.sub($.charCodeAt(this.sq, 0), 97);
  var t2 = this.sz;
  var x = $.mul(t1, t2);
  if (typeof t2 !== 'number') throw $.iae(t2);
  t1 = 8 * t2;
  var t3 = $.mul($.sub($.charCodeAt(this.sq, 1), 48), t2);
  if (typeof t3 !== 'number') throw $.iae(t3);
  var y = t1 - t3;
  this.ctx.drawImage$5(this.img, x, y, t2, t2);
 },
 Piece$5: function(ctx, ratio, name$, data, sq) {
  this.sz = $.mul(this.ratio, 50);
  this.img = $._Elements_ImageElement(null, null, null);
  var t1 = this.data;
  var t2 = this.img;
  t2.set$src(t1);
  $.add$1(t2.get$on().get$load(), new $.anon1(this));
 }
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$load: function() {
  return this.operator$index$1('load');
 }
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._DeprecatedPeerConnectionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
 },
 get$load: function() {
  return this.operator$index$1('load');
 }
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
 },
 get$load: function() {
  return this.operator$index$1('load');
 }
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._EventsImpl = {"":
 ["_ptr"],
 super: "Object",
 operator$index$1: function(type) {
  return $._EventListenerListImpl$(this._ptr, type);
 }
};

$$._EventListenerListImpl = {"":
 ["_type", "_ptr"],
 super: "Object",
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
 },
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
 },
 add$1: function(listener) {
  return this.add$2(listener,false)
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$load: function() {
  return this.operator$index$1('load');
 }
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$load: function() {
  return this.operator$index$1('load');
 }
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
 },
 get$load: function() {
  return this.operator$index$1('load');
 }
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
 },
 get$load: function() {
  return this.operator$index$1('load');
 }
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl"
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._XMLHttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$load: function() {
  return this.operator$index$1('load');
 }
};

$$._XMLHttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$load: function() {
  return this.operator$index$1('load');
 }
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 }
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.next$0$bailout(2, t1, t2);
  this._pos = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  return t1[t2];
 },
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
      var t1 = this._array;
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t2, 1);
      return $.index(t1, t2);
  }
 },
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t2, t1);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t2 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 }
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 cleanup$0: function() {
 },
 reset$0: function() {
 },
 operator$indexSet$2: function(object, info) {
 },
 operator$index$1: function(object) {
  return;
 }
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List())) return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map()) return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort) return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync) return this.visitSendPortSync$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
 },
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
 }
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = ({});
  var t2 = this._visited;
  t1.copy_1 = $.index(t2, map);
  var t3 = t1.copy_1;
  if (!(t3 == null)) return t3;
  t1.copy_1 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1.copy_1);
  $.forEach(map, new $._Copier_visitMap_anon(this, t1));
  return t1.copy_1;
 },
 visitList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1.operator$index$1(list);
  if (!(copy == null)) return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  t1.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = copy.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    copy[i] = t2;
  }
  return copy;
 },
 visitList$1$bailout: function(state, list) {
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null)) return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    var t2 = copy.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    var t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = result.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    result[i] = t2;
  }
  return result;
 },
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    var t2 = result.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result[i] = t1;
  }
  return result;
 },
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
 },
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Manager = {"":
 ["managers", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  $.isEmpty(this.isolates) === true && this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
 },
 _nativeInitWorkerMessageHandler$0: function() {
      $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  ;
 },
 _nativeDetectEnvironment$0: function() {
      this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  ;
 },
 get$needSerialization: function() {
  return this.get$useWorkers();
 },
 get$useWorkers: function() {
  return this.supportsWorkers;
 },
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
 }
};

$$._IsolateContext = {"":
 ["isolateStatics", "ports?", "id?"],
 super: "Object",
 _setGlobals$0: function() {
  $setGlobals(this);;
 },
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.$call$0();
  } finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    !(t1 == null) && t1._setGlobals$0();
  }
  return result;
 },
 initGlobals$0: function() {
  $initGlobals(this);;
 },
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
 }
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 run$0: function() {
  if ($._globalState().get$isWorker() !== true) this._runHelper$0();
  else {
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }
  }
 },
 _runHelper$0: function() {
  if (!($._window() == null)) new $._EventLoop__runHelper_next(this).$call$0();
  else {
    for (; this.runIteration$0() === true; ) {
    }
  }
 },
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true) $._globalState().maybeCloseWorker$0();
    else {
      if (!($._globalState().get$rootContext() == null) && ($._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && ($._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true))) throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    }
    return false;
  }
  event$.process$0();
  return true;
 },
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true) return;
  return t1.removeFirst$0();
 }
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 postMessage$1: function(msg) {
  $globalThis.postMessage(msg);;
 },
 get$id: function() {
  return 0;
 }
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._receivePort.get$_id();
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
 },
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId?", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
 },
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort) {
    var t1 = $.eqB(this._workerId, other._workerId) && ($.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId));
  } else t1 = false;
  return t1;
 },
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
 },
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port.get$_isolateId(), port.get$_receivePort().get$_id()];
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
 },
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
 },
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
 },
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 _getAttachedInfo$1: function(o) {
  return o['__MessageTraverser__attached_info__'];;
 },
 _setAttachedInfo$2: function(o, info) {
  o['__MessageTraverser__attached_info__'] = info;;
 },
 _clearAttachedInfo$1: function(o) {
  o['__MessageTraverser__attached_info__'] = (void 0);;
 },
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number') return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
 },
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
 },
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
 }
};

$$.PieceMoveSet = {"":
 ["Moves?"],
 super: "Object"
};

$$.MoveArrays = {"":
 ["KingTotalMoves=", "KingMoves=", "RookTotalMoves4=", "RookMoves4=", "RookTotalMoves3=", "RookMoves3=", "RookTotalMoves2=", "RookMoves2=", "RookTotalMoves1=", "RookMoves1=", "QueenTotalMoves8=", "QueenMoves8=", "QueenTotalMoves7=", "QueenMoves7=", "QueenTotalMoves6=", "QueenMoves6=", "QueenTotalMoves5=", "QueenMoves5=", "QueenTotalMoves4=", "QueenMoves4=", "QueenTotalMoves3=", "QueenMoves3=", "QueenTotalMoves2=", "QueenMoves2=", "QueenTotalMoves1=", "QueenMoves1=", "KnightTotalMoves=", "KnightMoves=", "WhitePawnTotalMoves=", "WhitePawnMoves=", "BlackPawnTotalMoves=", "BlackPawnMoves=", "BishopTotalMoves4=", "BishopMoves4=", "BishopTotalMoves3=", "BishopMoves3=", "BishopTotalMoves2=", "BishopMoves2=", "BishopTotalMoves1=", "BishopMoves1="],
 super: "Object"
};

$$.PieceMoves = {"":
 ["_moveArrays"],
 super: "Object",
 InitiateChessPieceMotion$0: function() {
  this._moveArrays = $.MoveArrays$();
  var t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$WhitePawnMoves(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$WhitePawnTotalMoves(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$BlackPawnMoves(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$BlackPawnTotalMoves(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$KnightMoves(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$KnightTotalMoves(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$BishopMoves1(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$BishopTotalMoves1(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$BishopMoves2(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$BishopTotalMoves2(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$BishopMoves3(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$BishopTotalMoves3(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$BishopMoves4(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$BishopTotalMoves4(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$RookMoves1(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$RookTotalMoves1(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$RookMoves2(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$RookTotalMoves2(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$RookMoves3(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$RookTotalMoves3(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$RookMoves4(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$RookTotalMoves4(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$QueenMoves1(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$QueenTotalMoves1(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$QueenMoves2(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$QueenTotalMoves2(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$QueenMoves3(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$QueenTotalMoves3(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$QueenMoves4(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$QueenTotalMoves4(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$QueenMoves5(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$QueenTotalMoves5(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$QueenMoves6(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$QueenTotalMoves6(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$QueenMoves7(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$QueenTotalMoves7(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$QueenMoves8(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$QueenTotalMoves8(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'PieceMoveSet'}));
  this._moveArrays.set$KingMoves(t1);
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  this._moveArrays.set$KingTotalMoves(t1);
  for (var i = 0; i < 64; ++i) {
    $.indexSet(this._moveArrays.get$WhitePawnTotalMoves(), i, 0);
    $.indexSet(this._moveArrays.get$BlackPawnTotalMoves(), i, 0);
    $.indexSet(this._moveArrays.get$KnightTotalMoves(), i, 0);
    $.indexSet(this._moveArrays.get$BishopTotalMoves1(), i, 0);
    $.indexSet(this._moveArrays.get$BishopTotalMoves2(), i, 0);
    $.indexSet(this._moveArrays.get$BishopTotalMoves3(), i, 0);
    $.indexSet(this._moveArrays.get$BishopTotalMoves4(), i, 0);
    $.indexSet(this._moveArrays.get$RookTotalMoves1(), i, 0);
    $.indexSet(this._moveArrays.get$RookTotalMoves2(), i, 0);
    $.indexSet(this._moveArrays.get$RookTotalMoves3(), i, 0);
    $.indexSet(this._moveArrays.get$RookTotalMoves4(), i, 0);
    $.indexSet(this._moveArrays.get$QueenTotalMoves1(), i, 0);
    $.indexSet(this._moveArrays.get$QueenTotalMoves2(), i, 0);
    $.indexSet(this._moveArrays.get$QueenTotalMoves3(), i, 0);
    $.indexSet(this._moveArrays.get$QueenTotalMoves4(), i, 0);
    $.indexSet(this._moveArrays.get$QueenTotalMoves5(), i, 0);
    $.indexSet(this._moveArrays.get$QueenTotalMoves6(), i, 0);
    $.indexSet(this._moveArrays.get$QueenTotalMoves7(), i, 0);
    $.indexSet(this._moveArrays.get$QueenTotalMoves8(), i, 0);
    $.indexSet(this._moveArrays.get$KingTotalMoves(), i, 0);
  }
  this.SetMovesWhitePawn$0();
  this.SetMovesBlackPawn$0();
  this.SetMovesKnight$0();
  this.SetMovesBishop$0();
  this.SetMovesRook$0();
  this.SetMovesQueen$0();
  this.SetMovesKing$0();
  return this._moveArrays;
 },
 Position$2: function(col, row) {
  if (typeof col !== 'number') return this.Position$2$bailout(1, col, row);
  if (typeof row !== 'number') return this.Position$2$bailout(1, col, row);
  return col + row * 8;
 },
 Position$2$bailout: function(state, col, row) {
  return $.add(col, $.mul(row, 8));
 },
 get$Position: function() { return new $.BoundClosure1(this, 'Position$2'); },
 SetMovesKing$0: function() {
  for (var y = 0; y < 8; ++y) {
    for (var t1 = y > 0, col = y - 1, t2 = y < 7, col0 = y + 1, x = 0; x < 8; ++x) {
      var index = $.toInt(y + x * 8);
      var t3 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t3, ({E: 'int'}));
      var moveset = $.PieceMoveSet$(t3);
      t3 = x < 7;
      if (t3) {
        var move = this.Position$2(y, x + 1);
        $.add$1(moveset.Moves, move);
        var t4 = this._moveArrays.get$KingTotalMoves();
        $.indexSet(t4, index, $.add($.index(t4, index), 1));
      }
      t4 = x > 0;
      if (t4) {
        move = this.Position$2(y, x - 1);
        $.add$1(moveset.Moves, move);
        var t5 = this._moveArrays.get$KingTotalMoves();
        $.indexSet(t5, index, $.add($.index(t5, index), 1));
      }
      if (t1) {
        move = this.Position$2(col, x);
        $.add$1(moveset.Moves, move);
        t5 = this._moveArrays.get$KingTotalMoves();
        $.indexSet(t5, index, $.add($.index(t5, index), 1));
      }
      if (t2) {
        move = this.Position$2(col0, x);
        $.add$1(moveset.Moves, move);
        t5 = this._moveArrays.get$KingTotalMoves();
        $.indexSet(t5, index, $.add($.index(t5, index), 1));
      }
      if (t3 && t2) {
        move = this.Position$2(col0, x + 1);
        $.add$1(moveset.Moves, move);
        t5 = this._moveArrays.get$KingTotalMoves();
        $.indexSet(t5, index, $.add($.index(t5, index), 1));
      }
      if (t3 && t1) {
        move = this.Position$2(col, x + 1);
        $.add$1(moveset.Moves, move);
        t3 = this._moveArrays.get$KingTotalMoves();
        $.indexSet(t3, index, $.add($.index(t3, index), 1));
      }
      if (t4 && t2) {
        move = this.Position$2(col0, x - 1);
        $.add$1(moveset.Moves, move);
        t3 = this._moveArrays.get$KingTotalMoves();
        $.indexSet(t3, index, $.add($.index(t3, index), 1));
      }
      if (t4 && t1) {
        move = this.Position$2(col, x - 1);
        $.add$1(moveset.Moves, move);
        t3 = this._moveArrays.get$KingTotalMoves();
        $.indexSet(t3, index, $.add($.index(t3, index), 1));
      }
      $.indexSet(this._moveArrays.get$KingMoves(), index, moveset);
    }
  }
 },
 SetMovesQueen$0: function() {
  for (var y = 0; y < 8; ++y) {
    for (var x = 0; x < 8; ++x) {
      var index = $.toInt(y + x * 8);
      var t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      var moveset = $.PieceMoveSet$(t1);
      for (t1 = moveset.Moves, row = x, move = null; row < 7; ) {
        ++row;
        move = this.Position$2(y, row);
        $.add$1(t1, move);
        var t2 = this._moveArrays.get$QueenTotalMoves1();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$QueenMoves1(), index, moveset);
      t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      moveset = $.PieceMoveSet$(t1);
      for (t1 = moveset.Moves, row = x; row > 0; ) {
        --row;
        move = this.Position$2(y, row);
        $.add$1(t1, move);
        t2 = this._moveArrays.get$QueenTotalMoves2();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$QueenMoves2(), index, moveset);
      t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      moveset = $.PieceMoveSet$(t1);
      for (t1 = moveset.Moves, col = y; col > 0; ) {
        --col;
        move = this.Position$2(col, x);
        $.add$1(t1, move);
        t2 = this._moveArrays.get$QueenTotalMoves3();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$QueenMoves3(), index, moveset);
      t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      moveset = $.PieceMoveSet$(t1);
      for (t1 = moveset.Moves, col = y; col < 7; ) {
        ++col;
        move = this.Position$2(col, x);
        $.add$1(t1, move);
        t2 = this._moveArrays.get$QueenTotalMoves4();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$QueenMoves4(), index, moveset);
      t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      moveset = $.PieceMoveSet$(t1);
      t1 = moveset.Moves;
      col = y;
      row = x;
      while (true) {
        if (!(row < 7 && col < 7)) break;
        ++row;
        ++col;
        move = this.Position$2(col, row);
        $.add$1(t1, move);
        t2 = this._moveArrays.get$QueenTotalMoves5();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$QueenMoves5(), index, moveset);
      t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      moveset = $.PieceMoveSet$(t1);
      t1 = moveset.Moves;
      col = y;
      row = x;
      while (true) {
        if (!(row < 7 && col > 0)) break;
        ++row;
        --col;
        move = this.Position$2(col, row);
        $.add$1(t1, move);
        t2 = this._moveArrays.get$QueenTotalMoves6();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$QueenMoves6(), index, moveset);
      t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      moveset = $.PieceMoveSet$(t1);
      t1 = moveset.Moves;
      col = y;
      row = x;
      while (true) {
        if (!(row > 0 && col < 7)) break;
        --row;
        ++col;
        move = this.Position$2(col, row);
        $.add$1(t1, move);
        t2 = this._moveArrays.get$QueenTotalMoves7();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$QueenMoves7(), index, moveset);
      t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      moveset = $.PieceMoveSet$(t1);
      t1 = moveset.Moves;
      col = y;
      row = x;
      while (true) {
        if (!(row > 0 && col > 0)) break;
        --row;
        --col;
        move = this.Position$2(col, row);
        $.add$1(t1, move);
        t2 = this._moveArrays.get$QueenTotalMoves8();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$QueenMoves8(), index, moveset);
    }
  }
  var move, row, col;
 },
 SetMovesRook$0: function() {
  for (var y = 0; y < 8; ++y) {
    for (var x = 0; x < 8; ++x) {
      var index = $.toInt(y + x * 8);
      var t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      var moveset = $.PieceMoveSet$(t1);
      for (t1 = moveset.Moves, row = x, move = null; row < 7; ) {
        ++row;
        move = this.Position$2(y, row);
        $.add$1(t1, move);
        var t2 = this._moveArrays.get$RookTotalMoves1();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$RookMoves1(), index, moveset);
      t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      moveset = $.PieceMoveSet$(t1);
      for (t1 = moveset.Moves, row = x; row > 0; ) {
        --row;
        move = this.Position$2(y, row);
        $.add$1(t1, move);
        t2 = this._moveArrays.get$RookTotalMoves2();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$RookMoves2(), index, moveset);
      t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      moveset = $.PieceMoveSet$(t1);
      for (t1 = moveset.Moves, col = y; col > 0; ) {
        --col;
        move = this.Position$2(col, x);
        $.add$1(t1, move);
        t2 = this._moveArrays.get$RookTotalMoves3();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$RookMoves3(), index, moveset);
      t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      moveset = $.PieceMoveSet$(t1);
      for (t1 = moveset.Moves, col = y; col < 7; ) {
        ++col;
        move = this.Position$2(col, x);
        $.add$1(t1, move);
        t2 = this._moveArrays.get$RookTotalMoves4();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$RookMoves4(), index, moveset);
    }
  }
  var move, row, col;
 },
 SetMovesBishop$0: function() {
  for (var y = 0; y < 8; ++y) {
    for (var x = 0; x < 8; ++x) {
      var index = $.toInt(y + x * 8);
      var t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      var moveset = $.PieceMoveSet$(t1);
      t1 = moveset.Moves;
      var col = y;
      var row = x;
      var move = null;
      while (true) {
        if (!(row < 7 && col < 7)) break;
        ++row;
        ++col;
        move = this.Position$2(col, row);
        $.add$1(t1, move);
        var t2 = this._moveArrays.get$BishopTotalMoves1();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$BishopMoves1(), index, moveset);
      t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      moveset = $.PieceMoveSet$(t1);
      t1 = moveset.Moves;
      col = y;
      row = x;
      while (true) {
        if (!(row < 7 && col > 0)) break;
        ++row;
        --col;
        move = this.Position$2(col, row);
        $.add$1(t1, move);
        t2 = this._moveArrays.get$BishopTotalMoves2();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$BishopMoves2(), index, moveset);
      t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      moveset = $.PieceMoveSet$(t1);
      t1 = moveset.Moves;
      col = y;
      row = x;
      while (true) {
        if (!(row > 0 && col < 7)) break;
        --row;
        ++col;
        move = this.Position$2(col, row);
        $.add$1(t1, move);
        t2 = this._moveArrays.get$BishopTotalMoves3();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$BishopMoves3(), index, moveset);
      t1 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t1, ({E: 'int'}));
      moveset = $.PieceMoveSet$(t1);
      t1 = moveset.Moves;
      col = y;
      row = x;
      while (true) {
        if (!(row > 0 && col > 0)) break;
        --row;
        --col;
        move = this.Position$2(col, row);
        $.add$1(t1, move);
        t2 = this._moveArrays.get$BishopTotalMoves4();
        $.indexSet(t2, index, $.add($.index(t2, index), 1));
      }
      $.indexSet(this._moveArrays.get$BishopMoves4(), index, moveset);
    }
  }
 },
 SetMovesKnight$0: function() {
  for (var y = 0; y < 8; ++y) {
    for (var t1 = y < 6, t2 = y + 2, t3 = y > 1, t4 = y - 2, t5 = y > 0, t6 = y - 1, t7 = y < 7, t8 = y + 1, x = 0; x < 8; ++x) {
      var index = $.toInt(y + x * 8);
      var t9 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t9, ({E: 'int'}));
      var moveset = $.PieceMoveSet$(t9);
      if (t1 && x > 0) {
        var move = this.Position$2($.toInt(t2), $.toInt(x - 1));
        if ($.ltB(move, 64)) {
          $.add$1(moveset.Moves, move);
          t9 = this._moveArrays.get$KnightTotalMoves();
          $.indexSet(t9, index, $.add($.index(t9, index), 1));
        }
      }
      if (t3 && x < 7) {
        move = this.Position$2($.toInt(t4), $.toInt(x + 1));
        if ($.ltB(move, 64)) {
          $.add$1(moveset.Moves, move);
          t9 = this._moveArrays.get$KnightTotalMoves();
          $.indexSet(t9, index, $.add($.index(t9, index), 1));
        }
      }
      if (t3 && x > 0) {
        move = this.Position$2($.toInt(t4), $.toInt(x - 1));
        if ($.ltB(move, 64)) {
          $.add$1(moveset.Moves, move);
          t9 = this._moveArrays.get$KnightTotalMoves();
          $.indexSet(t9, index, $.add($.index(t9, index), 1));
        }
      }
      if (t1 && x < 7) {
        move = this.Position$2($.toInt(t2), $.toInt(x + 1));
        if ($.ltB(move, 64)) {
          $.add$1(moveset.Moves, move);
          t9 = this._moveArrays.get$KnightTotalMoves();
          $.indexSet(t9, index, $.add($.index(t9, index), 1));
        }
      }
      if (t5 && x < 6) {
        move = this.Position$2($.toInt(t6), $.toInt(x + 2));
        if ($.ltB(move, 64)) {
          $.add$1(moveset.Moves, move);
          t9 = this._moveArrays.get$KnightTotalMoves();
          $.indexSet(t9, index, $.add($.index(t9, index), 1));
        }
      }
      if (t7 && x > 1) {
        move = this.Position$2($.toInt(t8), $.toInt(x - 2));
        if ($.ltB(move, 64)) {
          $.add$1(moveset.Moves, move);
          t9 = this._moveArrays.get$KnightTotalMoves();
          $.indexSet(t9, index, $.add($.index(t9, index), 1));
        }
      }
      if (t5 && x > 1) {
        move = this.Position$2($.toInt(t6), $.toInt(x - 2));
        if ($.ltB(move, 64)) {
          $.add$1(moveset.Moves, move);
          t9 = this._moveArrays.get$KnightTotalMoves();
          $.indexSet(t9, index, $.add($.index(t9, index), 1));
        }
      }
      if (t7 && x < 6) {
        move = this.Position$2($.toInt(t8), $.toInt(x + 2));
        if ($.ltB(move, 64)) {
          $.add$1(moveset.Moves, move);
          t9 = this._moveArrays.get$KnightTotalMoves();
          $.indexSet(t9, index, $.add($.index(t9, index), 1));
        }
      }
      $.indexSet(this._moveArrays.get$KnightMoves(), index, moveset);
    }
  }
 },
 SetMovesWhitePawn$0: function() {
  for (var index = 8; index <= 55; ++index) {
    var x = $.toInt($.mod(index, 8));
    var y = $.toInt(index / 8);
    var t1 = $.ListFactory_List(null);
    $.setRuntimeTypeInfo(t1, ({E: 'int'}));
    var moveset = $.PieceMoveSet$(t1);
    if ($.ltB(x, 7) && $.gtB(y, 0)) {
      $.add$1(moveset.Moves, $.toInt(index - 8 + 1));
      t1 = this._moveArrays.get$WhitePawnTotalMoves();
      $.indexSet(t1, index, $.add($.index(t1, index), 1));
    }
    if ($.gtB(x, 0) && $.gtB(y, 0)) {
      $.add$1(moveset.Moves, $.toInt(index - 8 - 1));
      t1 = this._moveArrays.get$WhitePawnTotalMoves();
      $.indexSet(t1, index, $.add($.index(t1, index), 1));
    }
    t1 = moveset.Moves;
    $.add$1(t1, $.toInt(index - 8));
    var t2 = this._moveArrays.get$WhitePawnTotalMoves();
    $.indexSet(t2, index, $.add($.index(t2, index), 1));
    if ($.eqB(y, 6)) {
      $.add$1(t1, $.toInt(index - 16));
      t1 = this._moveArrays.get$WhitePawnTotalMoves();
      $.indexSet(t1, index, $.add($.index(t1, index), 1));
    }
    $.indexSet(this._moveArrays.get$WhitePawnMoves(), index, moveset);
  }
 },
 SetMovesBlackPawn$0: function() {
  for (var index = 8; index <= 55; ++index) {
    var t1 = $.ListFactory_List(null);
    $.setRuntimeTypeInfo(t1, ({E: 'int'}));
    var moveset = $.PieceMoveSet$(t1);
    var x = $.toInt($.mod(index, 8));
    var y = $.toInt(index / 8);
    if ($.ltB(y, 7) && $.ltB(x, 7)) {
      $.add$1(moveset.Moves, $.toInt(index + 8 + 1));
      t1 = this._moveArrays.get$BlackPawnTotalMoves();
      $.indexSet(t1, index, $.add($.index(t1, index), 1));
    }
    if ($.gtB(x, 0) && $.ltB(y, 7)) {
      $.add$1(moveset.Moves, $.toInt(index + 8 - 1));
      t1 = this._moveArrays.get$BlackPawnTotalMoves();
      $.indexSet(t1, index, $.add($.index(t1, index), 1));
    }
    t1 = moveset.Moves;
    $.add$1(t1, $.toInt(index + 8));
    var t2 = this._moveArrays.get$BlackPawnTotalMoves();
    $.indexSet(t2, index, $.add($.index(t2, index), 1));
    if ($.eqB(y, 1)) {
      $.add$1(t1, $.toInt(index + 16));
      t1 = this._moveArrays.get$BlackPawnTotalMoves();
      $.indexSet(t1, index, $.add($.index(t1, index), 1));
    }
    $.indexSet(this._moveArrays.get$BlackPawnMoves(), index, moveset);
  }
 }
};

$$.ChessPieceColor = {"":
 ["_name", "_value"],
 super: "Object",
 get$value: function() {
  return this._value;
 },
 toString$0: function() {
  return this._name;
 }
};

$$.ChessPieceType = {"":
 ["_name", "_value"],
 super: "Object",
 get$value: function() {
  return this._value;
 },
 toString$0: function() {
  return this._name;
 }
};

$$.Piece = {"":
 ["ValidMoves=", "Selected!", "Moved=", "LastValidMoveCount", "DefendedValue=", "AttackedValue=", "PieceActionValue?", "PieceValue?", "PieceType=", "PieceColor?"],
 super: "Object",
 _CalculatePieceValue$1: function(pieceType) {
  $0:{
    var t1 = pieceType.get$value();
    if ($.eqB($.CTC3.get$value(), t1)) return 100;
    if ($.eqB($.CTC5.get$value(), t1)) return 320;
    if ($.eqB($.CTC6.get$value(), t1)) return 325;
    if ($.eqB($.CTC7.get$value(), t1)) return 500;
    if ($.eqB($.CTC8.get$value(), t1)) return 975;
    if ($.eqB($.CTC9.get$value(), t1)) return 32767;
    return 0;
  }
 },
 _CalculatePieceActionValue$1: function(pieceType) {
  $0:{
    var t1 = pieceType.get$value();
    if ($.eqB($.CTC3.get$value(), t1)) return 6;
    if ($.eqB($.CTC5.get$value(), t1)) return 3;
    if ($.eqB($.CTC6.get$value(), t1)) return 3;
    if ($.eqB($.CTC7.get$value(), t1)) return 2;
    if ($.eqB($.CTC8.get$value(), t1)) return 1;
    if ($.eqB($.CTC9.get$value(), t1)) return 1;
    return 0;
  }
 },
 Piece$fromPiece$1: function(piece) {
  this.PieceColor = piece.get$PieceColor();
  this.PieceType = piece.get$PieceType();
  this.Moved = piece.get$Moved();
  this.PieceValue = piece.get$PieceValue();
  this.PieceActionValue = piece.get$PieceActionValue();
  if (!(piece.get$ValidMoves() == null)) this.LastValidMoveCount = $.get$length(piece.get$ValidMoves());
 },
 Piece$fromType$2: function(chessPiece, chessPieceColor) {
  this.PieceType = chessPiece;
  this.PieceColor = chessPieceColor;
  if ($.eqB(this.PieceType, $.CTC3) || $.eqB(this.PieceType, $.CTC5)) this.LastValidMoveCount = 2;
  else this.LastValidMoveCount = 0;
  this.ValidMoves = [];
  this.PieceValue = this._CalculatePieceValue$1(this.PieceType);
  this.PieceActionValue = this._CalculatePieceActionValue$1(this.PieceType);
 }
};

$$.Square = {"":
 ["PlacedPiece="],
 super: "Object",
 Square$1: function(piece) {
  this.PlacedPiece = $.Piece$fromPiece(piece);
 },
 Square$empty$0: function() {
  this.PlacedPiece = null;
 }
};

$$.PieceMoving = {"":
 ["SrcPosition?", "PieceType=", "PieceColor?", "Moved=", "DstPosition?"],
 super: "Object",
 PieceMoving$5: function(pieceColor, pieceType, moved, srcPosition, dstPosition) {
  this.PieceColor = pieceColor;
  this.PieceType = pieceType;
  this.SrcPosition = srcPosition;
  this.DstPosition = dstPosition;
  this.Moved = moved;
 },
 PieceMoving$fromPieceMoving$1: function(pieceMoving) {
  this.PieceColor = pieceMoving.get$PieceColor();
  this.PieceType = pieceMoving.get$PieceType();
  this.SrcPosition = pieceMoving.get$SrcPosition();
  this.DstPosition = pieceMoving.get$DstPosition();
  this.Moved = pieceMoving.get$Moved();
 },
 PieceMoving$fromChessPieceType$1: function(pieceType) {
  this.PieceType = pieceType;
  this.PieceColor = $.CTC2;
  this.SrcPosition = 0;
  this.DstPosition = 0;
  this.Moved = false;
 }
};

$$.PieceTaken = {"":
 ["Position?", "PieceType=", "PieceColor?", "Moved="],
 super: "Object",
 PieceTaken$4: function(pieceColor, pieceType, moved, position) {
  this.PieceColor = pieceColor;
  this.PieceType = pieceType;
  this.Position = position;
  this.Moved = moved;
 },
 PieceTaken$fromChessPieceType$1: function(pieceType) {
  this.PieceColor = $.CTC2;
  this.PieceType = pieceType;
  this.Position = 0;
  this.Moved = false;
 }
};

$$.MoveContent = {"":
 ["TakenPiece=", "PawnPromoted=", "MovingPieceSecondary=", "MovingPiecePrimary=", "EnPassantOccured="],
 super: "Object",
 toString$0: function() {
  var value = $.StringBufferImpl$('');
  var srcCol = $.toInt($.mod(this.MovingPiecePrimary.get$SrcPosition(), 8));
  var t1 = $.div(this.MovingPiecePrimary.get$SrcPosition(), 8);
  if (typeof t1 !== 'number') throw $.iae(t1);
  var srcRow = $.toInt(8 - t1);
  var dstCol = $.toInt($.mod(this.MovingPiecePrimary.get$DstPosition(), 8));
  var t2 = $.div(this.MovingPiecePrimary.get$DstPosition(), 8);
  if (typeof t2 !== 'number') throw $.iae(t2);
  var dstRow = $.toInt(8 - t2);
  if ($.eqB(this.MovingPieceSecondary.get$PieceType(), $.CTC7)) {
    if ($.eqB(this.MovingPieceSecondary.get$PieceColor(), $.CTC4)) {
      if ($.eqB(this.MovingPieceSecondary.get$SrcPosition(), 7)) value.add$1('O-O');
      else {
        $.eqB(this.MovingPieceSecondary.get$SrcPosition(), 0) && value.add$1('O-O-O');
      }
    } else {
      if ($.eqB(this.MovingPieceSecondary.get$PieceColor(), $.CTC2)) {
        if ($.eqB(this.MovingPieceSecondary.get$SrcPosition(), 63)) value.add$1('O-O');
        else {
          $.eqB(this.MovingPieceSecondary.get$SrcPosition(), 56) && value.add$1('O-O-O');
        }
      }
    }
  } else {
    value.add$1($.toString(this._GetPgnMove$1(this.MovingPiecePrimary.get$PieceType())));
    $0:{
      t1 = this.MovingPiecePrimary.get$PieceType().get$value();
      if ($.eqB($.CTC5.get$value(), t1)) {
        value.add$1($.toString(this._GetColumnFromInt$1(srcCol)));
        value.add$1($.toString(srcRow));
        break $0;
      } else {
        if ($.eqB($.CTC7.get$value(), t1)) {
          value.add$1($.toString(this._GetColumnFromInt$1(srcCol)));
          value.add$1($.toString(srcRow));
          break $0;
        } else {
          if ($.eqB($.CTC3.get$value(), t1)) {
            !$.eqB(srcCol, dstCol) && value.add$1($.toString(this._GetColumnFromInt$1(srcCol)));
            break $0;
          }
        }
      }
    }
    !$.eqB(this.TakenPiece.get$PieceType(), $.CTC10) && value.add$1('x');
    value.add$1($.toString(this._GetColumnFromInt$1(dstCol)));
    value.add$1($.toString(dstRow));
    this.PawnPromoted === true && value.add$1('=Q');
  }
  return value.toString$0();
 },
 _GetPgnMove$1: function(pieceType) {
  $0:{
    var t1 = pieceType.get$value();
    if ($.eqB($.CTC6.get$value(), t1)) return 'B';
    if ($.eqB($.CTC9.get$value(), t1)) return 'K';
    if ($.eqB($.CTC5.get$value(), t1)) return 'N';
    if ($.eqB($.CTC8.get$value(), t1)) return 'Q';
    if ($.eqB($.CTC7.get$value(), t1)) return 'R';
    return '';
  }
 },
 _GetColumnFromInt$1: function(column) {
  switch (column) {
    case 0:
      return 'a';
    case 1:
      return 'b';
    case 2:
      return 'c';
    case 3:
      return 'd';
    case 4:
      return 'e';
    case 5:
      return 'f';
    case 6:
      return 'g';
    case 7:
      return 'h';
    default:
      return 'Unknown';
  }
 },
 MoveContent$fromMoveContent$1: function(moveContent) {
  this.MovingPiecePrimary = $.PieceMoving$fromPieceMoving(moveContent.get$MovingPiecePrimary());
  this.MovingPieceSecondary = $.PieceMoving$fromPieceMoving(moveContent.get$MovingPieceSecondary());
  this.TakenPiece = $.PieceTaken$(moveContent.get$TakenPiece().get$PieceColor(), moveContent.get$TakenPiece().get$PieceType(), moveContent.get$TakenPiece().get$Moved(), moveContent.get$TakenPiece().get$Position());
  this.EnPassantOccured = moveContent.get$EnPassantOccured();
  this.PawnPromoted = moveContent.get$PawnPromoted();
 },
 MoveContent$0: function() {
  this.MovingPiecePrimary = $.PieceMoving$fromChessPieceType($.CTC10);
  this.MovingPieceSecondary = $.PieceMoving$fromChessPieceType($.CTC10);
  this.TakenPiece = $.PieceTaken$fromChessPieceType($.CTC10);
 }
};

$$.PieceValidMoves = {"":
 ["_whiteKingPosition", "WhiteAttackBoard", "_blackKingPosition", "BlackAttackBoard", "_moveArrays"],
 super: "Object",
 _GenerateValidMovesKingCastle$2: function(board, king) {
  if (king == null) return;
  if (king.get$Moved() === true) return;
  if ($.eqB(king.get$PieceColor(), $.CTC2) && board.get$WhiteCastled() === true) return;
  if ($.eqB(king.get$PieceColor(), $.CTC4) && board.get$BlackCastled() === true) return;
  if ($.eqB(king.get$PieceColor(), $.CTC4) && board.get$BlackCheck() === true) return;
  if ($.eqB(king.get$PieceColor(), $.CTC2) && board.get$WhiteCheck() === true) return;
  if ($.eqB(king.get$PieceColor(), $.CTC2)) {
    if (board.get$WhiteCheck() === true) return;
    if (!($.index(board.get$Squares(), 63).get$PlacedPiece() == null)) {
      if ($.eqB($.index(board.get$Squares(), 63).get$PlacedPiece().get$PieceType(), $.CTC7)) {
        if ($.eqB($.index(board.get$Squares(), 63).get$PlacedPiece().get$PieceColor(), king.get$PieceColor())) {
          if ($.index(board.get$Squares(), 62).get$PlacedPiece() == null) {
            if ($.index(board.get$Squares(), 61).get$PlacedPiece() == null) {
              if ($.eqB($.index(this.BlackAttackBoard, 61), false) && $.eqB($.index(this.BlackAttackBoard, 62), false)) {
                $.add$1(king.get$ValidMoves(), 62);
                $.indexSet(this.WhiteAttackBoard, 62, true);
              }
            }
          }
        }
      }
    }
    if (!($.index(board.get$Squares(), 56).get$PlacedPiece() == null)) {
      if ($.eqB($.index(board.get$Squares(), 56).get$PlacedPiece().get$PieceType(), $.CTC7)) {
        if ($.eqB($.index(board.get$Squares(), 56).get$PlacedPiece().get$PieceColor(), king.get$PieceColor())) {
          if ($.index(board.get$Squares(), 57).get$PlacedPiece() == null) {
            if ($.index(board.get$Squares(), 58).get$PlacedPiece() == null) {
              if ($.index(board.get$Squares(), 59).get$PlacedPiece() == null) {
                if ($.eqB($.index(this.BlackAttackBoard, 58), false) && $.eqB($.index(this.BlackAttackBoard, 59), false)) {
                  $.add$1(king.get$ValidMoves(), 58);
                  $.indexSet(this.WhiteAttackBoard, 58, true);
                }
              }
            }
          }
        }
      }
    }
  } else {
    if ($.eqB(king.get$PieceColor(), $.CTC4)) {
      if (board.get$BlackCheck() === true) return;
      if (!($.index(board.get$Squares(), 7).get$PlacedPiece() == null)) {
        if ($.eqB($.index(board.get$Squares(), 7).get$PlacedPiece().get$PieceType(), $.CTC7) && $.index(board.get$Squares(), 7).get$PlacedPiece().get$Moved() !== true) {
          if ($.eqB($.index(board.get$Squares(), 7).get$PlacedPiece().get$PieceColor(), king.get$PieceColor())) {
            if ($.index(board.get$Squares(), 6).get$PlacedPiece() == null) {
              if ($.index(board.get$Squares(), 5).get$PlacedPiece() == null) {
                if ($.eqB($.index(this.WhiteAttackBoard, 5), false) && $.eqB($.index(this.WhiteAttackBoard, 6), false)) {
                  $.add$1(king.get$ValidMoves(), 6);
                  $.indexSet(this.BlackAttackBoard, 6, true);
                }
              }
            }
          }
        }
      }
      if (!($.index(board.get$Squares(), 0).get$PlacedPiece() == null)) {
        if ($.eqB($.index(board.get$Squares(), 0).get$PlacedPiece().get$PieceType(), $.CTC7) && $.index(board.get$Squares(), 0).get$PlacedPiece().get$Moved() !== true) {
          if ($.eqB($.index(board.get$Squares(), 0).get$PlacedPiece().get$PieceColor(), king.get$PieceColor())) {
            if ($.index(board.get$Squares(), 1).get$PlacedPiece() == null) {
              if ($.index(board.get$Squares(), 2).get$PlacedPiece() == null) {
                if ($.index(board.get$Squares(), 3).get$PlacedPiece() == null) {
                  if ($.eqB($.index(this.WhiteAttackBoard, 2), false) && $.eqB($.index(this.WhiteAttackBoard, 3), false)) {
                    $.add$1(king.get$ValidMoves(), 2);
                    $.indexSet(this.BlackAttackBoard, 2, true);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
 },
 _GenerateValidMovesKing$3: function(piece, board, srcPosition) {
  if (piece == null) return;
  for (var t1 = this._moveArrays, i = 0; $.ltB(i, $.index(t1.get$KingTotalMoves(), srcPosition)); ++i) {
    var dstPos = $.index($.index(t1.get$KingMoves(), srcPosition).get$Moves(), i);
    if ($.eqB(piece.get$PieceColor(), $.CTC2)) {
      if ($.index(this.BlackAttackBoard, dstPos) === true) {
        $.indexSet(this.WhiteAttackBoard, dstPos, true);
        continue;
      }
    } else {
      if ($.index(this.WhiteAttackBoard, dstPos) === true) {
        $.indexSet(this.BlackAttackBoard, dstPos, true);
        continue;
      }
    }
    this._AnalyzeMove$3(board, dstPos, piece);
  }
 },
 GenerateValidMoves$1: function(board) {
  board.set$BlackCheck(false);
  board.set$WhiteCheck(false);
  var t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'bool'}));
  this.WhiteAttackBoard = t1;
  t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'bool'}));
  this.BlackAttackBoard = t1;
  for (var x = 0; x < 64; ++x) {
    $.indexSet(this.WhiteAttackBoard, x, false);
    $.indexSet(this.BlackAttackBoard, x, false);
  }
  for (t1 = this._moveArrays, x = 0; x < 64; ++x) {
    var sqr = $.index(board.get$Squares(), x);
    if (sqr.get$PlacedPiece() == null) continue;
    var t2 = [];
    sqr.get$PlacedPiece().set$ValidMoves(t2);
    $1:{
      t2 = sqr.get$PlacedPiece().get$PieceType().get$value();
      if ($.eqB($.CTC3.get$value(), t2)) {
        if ($.eqB(sqr.get$PlacedPiece().get$PieceColor(), $.CTC2)) {
          this._CheckValidMovesPawn$5($.index(t1.get$WhitePawnMoves(), x).get$Moves(), sqr.get$PlacedPiece(), x, board, $.index(t1.get$WhitePawnTotalMoves(), x));
          break $1;
        }
        if ($.eqB(sqr.get$PlacedPiece().get$PieceColor(), $.CTC4)) {
          this._CheckValidMovesPawn$5($.index(t1.get$BlackPawnMoves(), x).get$Moves(), sqr.get$PlacedPiece(), x, board, $.index(t1.get$BlackPawnTotalMoves(), x));
          break $1;
        }
        break $1;
      } else {
        if ($.eqB($.CTC5.get$value(), t2)) {
          for (var i = 0; $.ltB(i, $.index(t1.get$KnightTotalMoves(), x)); ++i) {
            this._AnalyzeMove$3(board, $.index($.index(t1.get$KnightMoves(), x).get$Moves(), i), sqr.get$PlacedPiece());
          }
          break $1;
        } else {
          if ($.eqB($.CTC6.get$value(), t2)) {
            for (i = 0; $.ltB(i, $.index(t1.get$BishopTotalMoves1(), x)); ++i) {
              if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$BishopMoves1(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
            }
            for (i = 0; $.ltB(i, $.index(t1.get$BishopTotalMoves2(), x)); ++i) {
              if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$BishopMoves2(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
            }
            for (i = 0; $.ltB(i, $.index(t1.get$BishopTotalMoves3(), x)); ++i) {
              if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$BishopMoves3(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
            }
            for (i = 0; $.ltB(i, $.index(t1.get$BishopTotalMoves4(), x)); ++i) {
              if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$BishopMoves4(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
            }
            break $1;
          } else {
            if ($.eqB($.CTC7.get$value(), t2)) {
              for (i = 0; $.ltB(i, $.index(t1.get$RookTotalMoves1(), x)); ++i) {
                if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$RookMoves1(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
              }
              for (i = 0; $.ltB(i, $.index(t1.get$RookTotalMoves2(), x)); ++i) {
                if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$RookMoves2(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
              }
              for (i = 0; $.ltB(i, $.index(t1.get$RookTotalMoves3(), x)); ++i) {
                if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$RookMoves3(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
              }
              for (i = 0; $.ltB(i, $.index(t1.get$RookTotalMoves4(), x)); ++i) {
                if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$RookMoves4(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
              }
              break $1;
            } else {
              if ($.eqB($.CTC8.get$value(), t2)) {
                for (i = 0; $.ltB(i, $.index(t1.get$QueenTotalMoves1(), x)); ++i) {
                  if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$QueenMoves1(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
                }
                for (i = 0; $.ltB(i, $.index(t1.get$QueenTotalMoves2(), x)); ++i) {
                  if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$QueenMoves2(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
                }
                for (i = 0; $.ltB(i, $.index(t1.get$QueenTotalMoves3(), x)); ++i) {
                  if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$QueenMoves3(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
                }
                for (i = 0; $.ltB(i, $.index(t1.get$QueenTotalMoves4(), x)); ++i) {
                  if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$QueenMoves4(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
                }
                for (i = 0; $.ltB(i, $.index(t1.get$QueenTotalMoves5(), x)); ++i) {
                  if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$QueenMoves5(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
                }
                for (i = 0; $.ltB(i, $.index(t1.get$QueenTotalMoves6(), x)); ++i) {
                  if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$QueenMoves6(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
                }
                for (i = 0; $.ltB(i, $.index(t1.get$QueenTotalMoves7(), x)); ++i) {
                  if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$QueenMoves7(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
                }
                for (i = 0; $.ltB(i, $.index(t1.get$QueenTotalMoves8(), x)); ++i) {
                  if ($.eqB(this._AnalyzeMove$3(board, $.index($.index(t1.get$QueenMoves8(), x).get$Moves(), i), sqr.get$PlacedPiece()), false)) break;
                }
                break $1;
              } else {
                if ($.eqB($.CTC9.get$value(), t2)) {
                  if ($.eqB(sqr.get$PlacedPiece().get$PieceColor(), $.CTC2)) this._whiteKingPosition = x;
                  else this._blackKingPosition = x;
                  break $1;
                }
              }
            }
          }
        }
      }
    }
  }
  if ($.eqB(board.get$WhoseMove(), $.CTC2)) {
    this._GenerateValidMovesKing$3($.index(board.get$Squares(), this._blackKingPosition).get$PlacedPiece(), board, this._blackKingPosition);
    this._GenerateValidMovesKing$3($.index(board.get$Squares(), this._whiteKingPosition).get$PlacedPiece(), board, this._whiteKingPosition);
  } else {
    this._GenerateValidMovesKing$3($.index(board.get$Squares(), this._whiteKingPosition).get$PlacedPiece(), board, this._whiteKingPosition);
    this._GenerateValidMovesKing$3($.index(board.get$Squares(), this._blackKingPosition).get$PlacedPiece(), board, this._blackKingPosition);
  }
  this._GenerateValidMovesKingCastle$2(board, $.index(board.get$Squares(), this._whiteKingPosition).get$PlacedPiece());
  this._GenerateValidMovesKingCastle$2(board, $.index(board.get$Squares(), this._blackKingPosition).get$PlacedPiece());
 },
 _CheckValidMovesPawn$5: function(moves, pcMoving, srcPosition, board, count) {
  if (typeof moves !== 'string' && (typeof moves !== 'object' || moves === null || (moves.constructor !== Array && !moves.is$JavaScriptIndexingBehavior()))) return this._CheckValidMovesPawn$5$bailout(1, moves, pcMoving, srcPosition, board, count, 0, 0, 0);
  if (typeof srcPosition !== 'number') return this._CheckValidMovesPawn$5$bailout(1, moves, pcMoving, srcPosition, board, count, 0, 0, 0);
  if (typeof count !== 'number') return this._CheckValidMovesPawn$5$bailout(1, moves, pcMoving, srcPosition, board, count, 0, 0, 0);
  for (var t1 = $.mod(srcPosition, 8), i = 0; i < count; ++i) {
    var t2 = moves.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var t3 = moves[i];
    if (typeof t3 !== 'number') return this._CheckValidMovesPawn$5$bailout(2, moves, pcMoving, srcPosition, board, count, t3, i, 0);
    if (!($.mod(t3, 8) === t1)) {
      this._AnalyzeMovePawn$3(board, t3, pcMoving);
      if ($.eqB(pcMoving.get$PieceColor(), $.CTC2)) {
        t2 = this.WhiteAttackBoard;
        if (typeof t2 !== 'object' || t2 === null || ((t2.constructor !== Array || !!t2.immutable$list) && !t2.is$JavaScriptIndexingBehavior())) return this._CheckValidMovesPawn$5$bailout(3, moves, pcMoving, srcPosition, board, count, t2, t3, i);
        if (t3 !== (t3 | 0)) throw $.iae(t3);
        var t4 = t2.length;
        if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
        t2[t3] = true;
      } else {
        t2 = this.BlackAttackBoard;
        if (typeof t2 !== 'object' || t2 === null || ((t2.constructor !== Array || !!t2.immutable$list) && !t2.is$JavaScriptIndexingBehavior())) return this._CheckValidMovesPawn$5$bailout(4, moves, pcMoving, srcPosition, board, count, t2, t3, i);
        if (t3 !== (t3 | 0)) throw $.iae(t3);
        t4 = t2.length;
        if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
        t2[t3] = true;
      }
    } else {
      t2 = board.get$Squares();
      if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this._CheckValidMovesPawn$5$bailout(5, moves, pcMoving, srcPosition, board, count, t3, t2, i);
      if (t3 !== (t3 | 0)) throw $.iae(t3);
      t4 = t2.length;
      if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
      if (!(t2[t3].get$PlacedPiece() == null)) return;
      $.add$1(pcMoving.get$ValidMoves(), t3);
    }
  }
 },
 _CheckValidMovesPawn$5$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var moves = env0;
      var pcMoving = env1;
      var srcPosition = env2;
      var board = env3;
      var count = env4;
      break;
    case 1:
      moves = env0;
      pcMoving = env1;
      srcPosition = env2;
      board = env3;
      count = env4;
      break;
    case 1:
      moves = env0;
      pcMoving = env1;
      srcPosition = env2;
      board = env3;
      count = env4;
      break;
    case 2:
      moves = env0;
      pcMoving = env1;
      srcPosition = env2;
      board = env3;
      count = env4;
      dstPos = env5;
      i = env6;
      break;
    case 3:
      moves = env0;
      pcMoving = env1;
      srcPosition = env2;
      board = env3;
      count = env4;
      t1 = env5;
      dstPos = env6;
      i = env7;
      break;
    case 4:
      moves = env0;
      pcMoving = env1;
      srcPosition = env2;
      board = env3;
      count = env4;
      t1 = env5;
      dstPos = env6;
      i = env7;
      break;
    case 5:
      moves = env0;
      pcMoving = env1;
      srcPosition = env2;
      board = env3;
      count = env4;
      dstPos = env5;
      t1 = env6;
      i = env7;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
    case 1:
      state = 0;
      var i = 0;
    case 2:
    case 3:
    case 4:
    case 5:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, count)) break L0;
            var dstPos = $.index(moves, i);
          case 2:
            state = 0;
          case 3:
          case 4:
          case 5:
            if (state == 3 || state == 4 || (state == 0 && !$.eqB($.mod(dstPos, 8), $.mod(srcPosition, 8)))) {
              switch (state) {
                case 0:
                  this._AnalyzeMovePawn$3(board, dstPos, pcMoving);
                case 3:
                case 4:
                  if (state == 3 || (state == 0 && $.eqB(pcMoving.get$PieceColor(), $.CTC2))) {
                    switch (state) {
                      case 0:
                        var t1 = this.WhiteAttackBoard;
                      case 3:
                        state = 0;
                        $.indexSet(t1, dstPos, true);
                    }
                  } else {
                    switch (state) {
                      case 0:
                        t1 = this.BlackAttackBoard;
                      case 4:
                        state = 0;
                        $.indexSet(t1, dstPos, true);
                    }
                  }
              }
            } else {
              switch (state) {
                case 0:
                  t1 = board.get$Squares();
                case 5:
                  state = 0;
                  if (!($.index(t1, dstPos).get$PlacedPiece() == null)) return;
                  $.add$1(pcMoving.get$ValidMoves(), dstPos);
              }
            }
            ++i;
        }
      }
  }
 },
 _AnalyzeMove$3: function(board, dstPos, pcMoving) {
  if ($.eqB(pcMoving.get$PieceColor(), $.CTC2)) {
    var t1 = this.WhiteAttackBoard;
    if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this._AnalyzeMove$3$bailout(1, board, dstPos, pcMoving, t1, 0, 0);
    if (dstPos !== (dstPos | 0)) throw $.iae(dstPos);
    var t2 = t1.length;
    if (dstPos < 0 || dstPos >= t2) throw $.ioore(dstPos);
    t1[dstPos] = true;
  } else {
    t1 = this.BlackAttackBoard;
    if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this._AnalyzeMove$3$bailout(2, board, dstPos, pcMoving, t1, 0, 0);
    if (dstPos !== (dstPos | 0)) throw $.iae(dstPos);
    t2 = t1.length;
    if (dstPos < 0 || dstPos >= t2) throw $.ioore(dstPos);
    t1[dstPos] = true;
  }
  t1 = board.get$Squares();
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._AnalyzeMove$3$bailout(3, board, dstPos, pcMoving, t1, 0, 0);
  if (dstPos !== (dstPos | 0)) throw $.iae(dstPos);
  t2 = t1.length;
  if (dstPos < 0 || dstPos >= t2) throw $.ioore(dstPos);
  if (t1[dstPos].get$PlacedPiece() == null) {
    $.add$1(pcMoving.get$ValidMoves(), dstPos);
    return true;
  }
  t1 = board.get$Squares();
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._AnalyzeMove$3$bailout(4, board, dstPos, pcMoving, t1, 0, 0);
  t2 = t1.length;
  if (dstPos < 0 || dstPos >= t2) throw $.ioore(dstPos);
  var pcAttacked = t1[dstPos].get$PlacedPiece();
  if (!$.eqB(pcAttacked.get$PieceColor(), pcMoving.get$PieceColor())) {
    t1 = pcAttacked.get$AttackedValue();
    if (typeof t1 !== 'number') return this._AnalyzeMove$3$bailout(5, board, dstPos, pcMoving, t1, pcAttacked, 0);
    t2 = pcMoving.get$PieceActionValue();
    if (typeof t2 !== 'number') return this._AnalyzeMove$3$bailout(6, board, dstPos, pcMoving, t2, t1, pcAttacked);
    pcAttacked.set$AttackedValue(t1 + t2);
    if ($.eqB(pcAttacked.get$PieceType(), $.CTC9)) {
      if ($.eqB(pcAttacked.get$PieceColor(), $.CTC4)) board.set$BlackCheck(true);
      else board.set$WhiteCheck(true);
    } else $.add$1(pcMoving.get$ValidMoves(), dstPos);
    return false;
  }
  t1 = pcAttacked.get$DefendedValue();
  if (typeof t1 !== 'number') return this._AnalyzeMove$3$bailout(7, t1, pcMoving, pcAttacked, 0, 0, 0);
  t2 = pcMoving.get$PieceActionValue();
  if (typeof t2 !== 'number') return this._AnalyzeMove$3$bailout(8, t1, t2, pcAttacked, 0, 0, 0);
  pcAttacked.set$DefendedValue(t1 + t2);
  return false;
 },
 _AnalyzeMove$3$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var board = env0;
      var dstPos = env1;
      var pcMoving = env2;
      t1 = env3;
      break;
    case 2:
      board = env0;
      dstPos = env1;
      pcMoving = env2;
      t1 = env3;
      break;
    case 3:
      board = env0;
      dstPos = env1;
      pcMoving = env2;
      t1 = env3;
      break;
    case 4:
      board = env0;
      dstPos = env1;
      pcMoving = env2;
      t1 = env3;
      break;
    case 5:
      board = env0;
      dstPos = env1;
      pcMoving = env2;
      t1 = env3;
      pcAttacked = env4;
      break;
    case 6:
      board = env0;
      dstPos = env1;
      pcMoving = env2;
      t2 = env3;
      t1 = env4;
      pcAttacked = env5;
      break;
    case 7:
      t1 = env0;
      pcMoving = env1;
      pcAttacked = env2;
      break;
    case 8:
      t1 = env0;
      t2 = env1;
      pcAttacked = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
    case 2:
      if (state == 1 || (state == 0 && $.eqB(pcMoving.get$PieceColor(), $.CTC2))) {
        switch (state) {
          case 0:
            var t1 = this.WhiteAttackBoard;
          case 1:
            state = 0;
            $.indexSet(t1, dstPos, true);
        }
      } else {
        switch (state) {
          case 0:
            t1 = this.BlackAttackBoard;
          case 2:
            state = 0;
            $.indexSet(t1, dstPos, true);
        }
      }
      t1 = board.get$Squares();
    case 3:
      state = 0;
      if ($.index(t1, dstPos).get$PlacedPiece() == null) {
        $.add$1(pcMoving.get$ValidMoves(), dstPos);
        return true;
      }
      t1 = board.get$Squares();
    case 4:
      state = 0;
      var pcAttacked = $.index(t1, dstPos).get$PlacedPiece();
    case 5:
    case 6:
      if (state == 5 || state == 6 || (state == 0 && !$.eqB(pcAttacked.get$PieceColor(), pcMoving.get$PieceColor()))) {
        switch (state) {
          case 0:
            t1 = pcAttacked.get$AttackedValue();
          case 5:
            state = 0;
            var t2 = pcMoving.get$PieceActionValue();
          case 6:
            state = 0;
            pcAttacked.set$AttackedValue($.add(t1, t2));
            if ($.eqB(pcAttacked.get$PieceType(), $.CTC9)) {
              if ($.eqB(pcAttacked.get$PieceColor(), $.CTC4)) board.set$BlackCheck(true);
              else board.set$WhiteCheck(true);
            } else $.add$1(pcMoving.get$ValidMoves(), dstPos);
            return false;
        }
      }
      t1 = pcAttacked.get$DefendedValue();
    case 7:
      state = 0;
      t2 = pcMoving.get$PieceActionValue();
    case 8:
      state = 0;
      pcAttacked.set$DefendedValue($.add(t1, t2));
      return false;
  }
 },
 _AnalyzeMovePawn$3: function(board, dstPos, pcMoving) {
  var t1 = board.get$EnPassantPosition();
  if (typeof t1 !== 'number') return this._AnalyzeMovePawn$3$bailout(1, board, dstPos, pcMoving, t1, 0, 0);
  if (t1 > 0) {
    if (!$.eqB(pcMoving.get$PieceColor(), board.get$EnPassantColor())) {
      if ($.eqB(board.get$EnPassantPosition(), dstPos)) {
        $.add$1(pcMoving.get$ValidMoves(), dstPos);
        if ($.eqB(pcMoving.get$PieceColor(), $.CTC2)) {
          t1 = this.WhiteAttackBoard;
          if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this._AnalyzeMovePawn$3$bailout(2, board, dstPos, pcMoving, t1, 0, 0);
          if (dstPos !== (dstPos | 0)) throw $.iae(dstPos);
          var t2 = t1.length;
          if (dstPos < 0 || dstPos >= t2) throw $.ioore(dstPos);
          t1[dstPos] = true;
        } else {
          t1 = this.BlackAttackBoard;
          if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this._AnalyzeMovePawn$3$bailout(3, board, dstPos, pcMoving, t1, 0, 0);
          if (dstPos !== (dstPos | 0)) throw $.iae(dstPos);
          t2 = t1.length;
          if (dstPos < 0 || dstPos >= t2) throw $.ioore(dstPos);
          t1[dstPos] = true;
        }
      }
    }
  }
  t1 = board.get$Squares();
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._AnalyzeMovePawn$3$bailout(4, board, dstPos, pcMoving, t1, 0, 0);
  if (dstPos !== (dstPos | 0)) throw $.iae(dstPos);
  t2 = t1.length;
  if (dstPos < 0 || dstPos >= t2) throw $.ioore(dstPos);
  var pcAttacked = t1[dstPos].get$PlacedPiece();
  if (pcAttacked == null) return;
  if ($.eqB(pcMoving.get$PieceColor(), $.CTC2)) {
    t1 = this.WhiteAttackBoard;
    if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this._AnalyzeMovePawn$3$bailout(5, board, dstPos, pcMoving, t1, pcAttacked, 0);
    t2 = t1.length;
    if (dstPos < 0 || dstPos >= t2) throw $.ioore(dstPos);
    t1[dstPos] = true;
    if ($.eqB(pcAttacked.get$PieceColor(), pcMoving.get$PieceColor())) {
      t1 = pcAttacked.get$DefendedValue();
      if (typeof t1 !== 'number') return this._AnalyzeMovePawn$3$bailout(6, t1, pcMoving, pcAttacked, 0, 0, 0);
      t2 = pcMoving.get$PieceActionValue();
      if (typeof t2 !== 'number') return this._AnalyzeMovePawn$3$bailout(7, t1, t2, pcAttacked, 0, 0, 0);
      pcAttacked.set$DefendedValue(t1 + t2);
      return;
    }
    t1 = pcAttacked.get$AttackedValue();
    if (typeof t1 !== 'number') return this._AnalyzeMovePawn$3$bailout(8, board, dstPos, pcMoving, pcAttacked, t1, 0);
    t2 = pcMoving.get$PieceActionValue();
    if (typeof t2 !== 'number') return this._AnalyzeMovePawn$3$bailout(9, board, dstPos, pcMoving, pcAttacked, t1, t2);
    pcAttacked.set$AttackedValue(t1 + t2);
    if ($.eqB(pcAttacked.get$PieceType(), $.CTC9)) board.set$BlackCheck(true);
    else $.add$1(pcMoving.get$ValidMoves(), dstPos);
  } else {
    t1 = this.BlackAttackBoard;
    if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this._AnalyzeMovePawn$3$bailout(10, board, dstPos, pcMoving, t1, pcAttacked, 0);
    t2 = t1.length;
    if (dstPos < 0 || dstPos >= t2) throw $.ioore(dstPos);
    t1[dstPos] = true;
    if ($.eqB(pcAttacked.get$PieceColor(), pcMoving.get$PieceColor())) {
      t1 = pcAttacked.get$DefendedValue();
      if (typeof t1 !== 'number') return this._AnalyzeMovePawn$3$bailout(11, pcMoving, t1, pcAttacked, 0, 0, 0);
      t2 = pcMoving.get$PieceActionValue();
      if (typeof t2 !== 'number') return this._AnalyzeMovePawn$3$bailout(12, t1, t2, pcAttacked, 0, 0, 0);
      pcAttacked.set$DefendedValue(t1 + t2);
      return;
    }
    t1 = pcAttacked.get$AttackedValue();
    if (typeof t1 !== 'number') return this._AnalyzeMovePawn$3$bailout(13, board, dstPos, pcMoving, t1, pcAttacked, 0);
    t2 = pcMoving.get$PieceActionValue();
    if (typeof t2 !== 'number') return this._AnalyzeMovePawn$3$bailout(14, board, dstPos, pcMoving, pcAttacked, t1, t2);
    pcAttacked.set$AttackedValue(t1 + t2);
    if ($.eqB(pcAttacked.get$PieceType(), $.CTC9)) board.set$WhiteCheck(true);
    else $.add$1(pcMoving.get$ValidMoves(), dstPos);
  }
  return;
 },
 _AnalyzeMovePawn$3$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var board = env0;
      var dstPos = env1;
      var pcMoving = env2;
      t1 = env3;
      break;
    case 2:
      board = env0;
      dstPos = env1;
      pcMoving = env2;
      t1 = env3;
      break;
    case 3:
      board = env0;
      dstPos = env1;
      pcMoving = env2;
      t1 = env3;
      break;
    case 4:
      board = env0;
      dstPos = env1;
      pcMoving = env2;
      t1 = env3;
      break;
    case 5:
      board = env0;
      dstPos = env1;
      pcMoving = env2;
      t1 = env3;
      pcAttacked = env4;
      break;
    case 6:
      t1 = env0;
      pcMoving = env1;
      pcAttacked = env2;
      break;
    case 7:
      t1 = env0;
      t2 = env1;
      pcAttacked = env2;
      break;
    case 8:
      board = env0;
      dstPos = env1;
      pcMoving = env2;
      pcAttacked = env3;
      t1 = env4;
      break;
    case 9:
      board = env0;
      dstPos = env1;
      pcMoving = env2;
      pcAttacked = env3;
      t1 = env4;
      t2 = env5;
      break;
    case 10:
      board = env0;
      dstPos = env1;
      pcMoving = env2;
      t1 = env3;
      pcAttacked = env4;
      break;
    case 11:
      pcMoving = env0;
      t1 = env1;
      pcAttacked = env2;
      break;
    case 12:
      t1 = env0;
      t2 = env1;
      pcAttacked = env2;
      break;
    case 13:
      board = env0;
      dstPos = env1;
      pcMoving = env2;
      t1 = env3;
      pcAttacked = env4;
      break;
    case 14:
      board = env0;
      dstPos = env1;
      pcMoving = env2;
      pcAttacked = env3;
      t1 = env4;
      t2 = env5;
      break;
  }
  switch (state) {
    case 0:
      var t1 = board.get$EnPassantPosition();
    case 1:
      state = 0;
    case 2:
    case 3:
      if (state == 2 || state == 3 || (state == 0 && $.gtB(t1, 0))) {
        switch (state) {
          case 0:
          case 2:
          case 3:
            if (state == 2 || state == 3 || (state == 0 && !$.eqB(pcMoving.get$PieceColor(), board.get$EnPassantColor()))) {
              switch (state) {
                case 0:
                case 2:
                case 3:
                  if (state == 2 || state == 3 || (state == 0 && $.eqB(board.get$EnPassantPosition(), dstPos))) {
                    switch (state) {
                      case 0:
                        $.add$1(pcMoving.get$ValidMoves(), dstPos);
                      case 2:
                      case 3:
                        if (state == 2 || (state == 0 && $.eqB(pcMoving.get$PieceColor(), $.CTC2))) {
                          switch (state) {
                            case 0:
                              t1 = this.WhiteAttackBoard;
                            case 2:
                              state = 0;
                              $.indexSet(t1, dstPos, true);
                          }
                        } else {
                          switch (state) {
                            case 0:
                              t1 = this.BlackAttackBoard;
                            case 3:
                              state = 0;
                              $.indexSet(t1, dstPos, true);
                          }
                        }
                    }
                  }
              }
            }
        }
      }
      t1 = board.get$Squares();
    case 4:
      state = 0;
      var pcAttacked = $.index(t1, dstPos).get$PlacedPiece();
      if (pcAttacked == null) return;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
      if (state == 5 || state == 6 || state == 7 || state == 8 || state == 9 || (state == 0 && $.eqB(pcMoving.get$PieceColor(), $.CTC2))) {
        switch (state) {
          case 0:
            t1 = this.WhiteAttackBoard;
          case 5:
            state = 0;
            $.indexSet(t1, dstPos, true);
          case 6:
          case 7:
            if (state == 6 || state == 7 || (state == 0 && $.eqB(pcAttacked.get$PieceColor(), pcMoving.get$PieceColor()))) {
              switch (state) {
                case 0:
                  t1 = pcAttacked.get$DefendedValue();
                case 6:
                  state = 0;
                  var t2 = pcMoving.get$PieceActionValue();
                case 7:
                  state = 0;
                  pcAttacked.set$DefendedValue($.add(t1, t2));
                  return;
              }
            }
            t1 = pcAttacked.get$AttackedValue();
          case 8:
            state = 0;
            t2 = pcMoving.get$PieceActionValue();
          case 9:
            state = 0;
            pcAttacked.set$AttackedValue($.add(t1, t2));
            if ($.eqB(pcAttacked.get$PieceType(), $.CTC9)) board.set$BlackCheck(true);
            else $.add$1(pcMoving.get$ValidMoves(), dstPos);
        }
      } else {
        switch (state) {
          case 0:
            t1 = this.BlackAttackBoard;
          case 10:
            state = 0;
            $.indexSet(t1, dstPos, true);
          case 11:
          case 12:
            if (state == 11 || state == 12 || (state == 0 && $.eqB(pcAttacked.get$PieceColor(), pcMoving.get$PieceColor()))) {
              switch (state) {
                case 0:
                  t1 = pcAttacked.get$DefendedValue();
                case 11:
                  state = 0;
                  t2 = pcMoving.get$PieceActionValue();
                case 12:
                  state = 0;
                  pcAttacked.set$DefendedValue($.add(t1, t2));
                  return;
              }
            }
            t1 = pcAttacked.get$AttackedValue();
          case 13:
            state = 0;
            t2 = pcMoving.get$PieceActionValue();
          case 14:
            state = 0;
            pcAttacked.set$AttackedValue($.add(t1, t2));
            if ($.eqB(pcAttacked.get$PieceType(), $.CTC9)) board.set$WhiteCheck(true);
            else $.add$1(pcMoving.get$ValidMoves(), dstPos);
        }
      }
      return;
  }
 }
};

$$.Board = {"":
 ["MoveCount=", "WhoseMove=", "EnPassantPosition=", "EnPassantColor=", "LastMove=", "EndGamePhase?", "WhiteCastled=", "BlackCastled=", "RepeatedMove?", "FiftyMove=", "StaleMate=", "WhiteMate?", "WhiteCheck=", "BlackMate?", "BlackCheck=", "ZobristHash?", "Score?", "InsufficientMaterial", "Squares?"],
 super: "Object",
 SetEnpassantMove$3: function(board, dstPosition, pcColor) {
  if ($.eqB(board.get$EnPassantPosition(), dstPosition)) {
    if (!$.eqB(pcColor, board.get$EnPassantColor())) {
      var pieceLocationOffset = $.eqB(board.get$EnPassantColor(), $.CTC2) ? -8 : 8;
      var dstPosition0 = $.toInt($.add(dstPosition, pieceLocationOffset));
      var sqr = $.index(board.get$Squares(), dstPosition0);
      var t1 = $.PieceTaken$(sqr.get$PlacedPiece().get$PieceColor(), sqr.get$PlacedPiece().get$PieceType(), sqr.get$PlacedPiece().get$Moved(), dstPosition0);
      board.get$LastMove().set$TakenPiece(t1);
      $.index(board.get$Squares(), dstPosition0).set$PlacedPiece(null);
      board.set$FiftyMove(0);
      return true;
    }
  }
  return false;
 },
 RecordEnPassant$5: function(pcColor, pcType, board, srcPosition, dstPosition) {
  if ($.eqB(pcType, $.CTC3)) {
    board.set$FiftyMove(0);
    var difference = $.sub(srcPosition, dstPosition);
    if ($.eqB(difference, 16) || $.eqB(difference, -16)) {
      board.set$EnPassantPosition($.toInt($.add(dstPosition, $.div(difference, 2))));
      board.set$EnPassantColor(pcColor);
    }
  }
 },
 PromotePawns$4: function(board, piece, dstPosition, promoteToPiece) {
  if ($.eqB(piece.get$PieceType(), $.CTC3)) {
    if ($.ltB(dstPosition, 8)) {
      $.index(board.get$Squares(), dstPosition).get$PlacedPiece().set$PieceType(promoteToPiece);
      return true;
    }
    if ($.gtB(dstPosition, 55)) {
      $.index(board.get$Squares(), dstPosition).get$PlacedPiece().set$PieceType(promoteToPiece);
      return true;
    }
  }
  return false;
 },
 MovePiece$4: function(board, srcPosition, dstPosition, promoteToPiece) {
  var piece = $.index(board.get$Squares(), srcPosition).get$PlacedPiece();
  board.set$LastMove($.MoveContent$());
  board.set$FiftyMove($.add(board.get$FiftyMove(), 1));
  $.eqB(piece.get$PieceColor(), $.CTC4) && board.set$MoveCount($.add(board.get$MoveCount(), 1));
  if ($.gtB(board.get$EnPassantPosition(), 0)) {
    var t1 = this.SetEnpassantMove$3(board, dstPosition, piece.get$PieceColor());
    board.get$LastMove().set$EnPassantOccured(t1);
  }
  if (board.get$LastMove().get$EnPassantOccured() !== true) {
    var sqr = $.index(board.get$Squares(), dstPosition);
    if (!(sqr.get$PlacedPiece() == null)) {
      t1 = $.PieceTaken$(sqr.get$PlacedPiece().get$PieceColor(), sqr.get$PlacedPiece().get$PieceType(), sqr.get$PlacedPiece().get$Moved(), dstPosition);
      board.get$LastMove().set$TakenPiece(t1);
      board.set$FiftyMove(0);
    } else {
      t1 = $.PieceTaken$($.CTC2, $.CTC10, false, dstPosition);
      board.get$LastMove().set$TakenPiece(t1);
    }
  }
  t1 = $.PieceMoving$(piece.get$PieceColor(), piece.get$PieceType(), piece.get$Moved(), srcPosition, dstPosition);
  board.get$LastMove().set$MovingPiecePrimary(t1);
  $.index(board.get$Squares(), srcPosition).set$PlacedPiece(null);
  piece.set$Moved(true);
  piece.set$Selected(false);
  $.index(board.get$Squares(), dstPosition).set$PlacedPiece(piece);
  board.set$EnPassantPosition(0);
  if ($.eqB(piece.get$PieceType(), $.CTC3)) {
    board.set$FiftyMove(0);
    this.RecordEnPassant$5(piece.get$PieceColor(), piece.get$PieceType(), board, srcPosition, dstPosition);
  }
  board.set$WhoseMove($.eqB(board.get$WhoseMove(), $.CTC2) ? $.CTC4 : $.CTC2);
  this.KingCastle$4(board, piece, srcPosition, dstPosition);
  if (this.PromotePawns$4(board, piece, dstPosition, promoteToPiece) === true) board.get$LastMove().set$PawnPromoted(true);
  else board.get$LastMove().set$PawnPromoted(false);
  $.geB(board.get$FiftyMove(), 50) && board.set$StaleMate(true);
  return board.get$LastMove();
 },
 KingCastle$4: function(board, piece, srcPosition, dstPosition) {
  if (!$.eqB(piece.get$PieceType(), $.CTC9)) return;
  if ($.eqB(piece.get$PieceColor(), $.CTC2) && $.eqB(srcPosition, 60)) {
    if ($.eqB(dstPosition, 62)) {
      if (!($.index(board.get$Squares(), 63).get$PlacedPiece() == null)) {
        var t1 = $.index(board.get$Squares(), 63).get$PlacedPiece();
        $.index(board.get$Squares(), 61).set$PlacedPiece(t1);
        $.index(board.get$Squares(), 63).set$PlacedPiece(null);
        board.set$WhiteCastled(true);
        t1 = $.PieceMoving$($.index(board.get$Squares(), 61).get$PlacedPiece().get$PieceColor(), $.index(board.get$Squares(), 61).get$PlacedPiece().get$PieceType(), $.index(board.get$Squares(), 61).get$PlacedPiece().get$Moved(), 63, 61);
        board.get$LastMove().set$MovingPieceSecondary(t1);
        $.index(board.get$Squares(), 61).get$PlacedPiece().set$Moved(true);
        return;
      }
    } else {
      if ($.eqB(dstPosition, 58)) {
        if (!($.index(board.get$Squares(), 56).get$PlacedPiece() == null)) {
          t1 = $.index(board.get$Squares(), 56).get$PlacedPiece();
          $.index(board.get$Squares(), 59).set$PlacedPiece(t1);
          $.index(board.get$Squares(), 56).set$PlacedPiece(null);
          board.set$WhiteCastled(true);
          t1 = $.PieceMoving$($.index(board.get$Squares(), 59).get$PlacedPiece().get$PieceColor(), $.index(board.get$Squares(), 59).get$PlacedPiece().get$PieceType(), $.index(board.get$Squares(), 59).get$PlacedPiece().get$Moved(), 56, 59);
          board.get$LastMove().set$MovingPieceSecondary(t1);
          $.index(board.get$Squares(), 59).get$PlacedPiece().set$Moved(true);
          return;
        }
      }
    }
  } else {
    if ($.eqB(piece.get$PieceColor(), $.CTC4) && $.eqB(srcPosition, 4)) {
      if ($.eqB(dstPosition, 6)) {
        if (!($.index(board.get$Squares(), 7).get$PlacedPiece() == null)) {
          t1 = $.index(board.get$Squares(), 7).get$PlacedPiece();
          $.index(board.get$Squares(), 5).set$PlacedPiece(t1);
          $.index(board.get$Squares(), 7).set$PlacedPiece(null);
          board.set$BlackCastled(true);
          t1 = $.PieceMoving$($.index(board.get$Squares(), 5).get$PlacedPiece().get$PieceColor(), $.index(board.get$Squares(), 5).get$PlacedPiece().get$PieceType(), $.index(board.get$Squares(), 5).get$PlacedPiece().get$Moved(), 7, 5);
          board.get$LastMove().set$MovingPieceSecondary(t1);
          $.index(board.get$Squares(), 5).get$PlacedPiece().set$Moved(true);
          return;
        }
      } else {
        if ($.eqB(dstPosition, 2)) {
          if (!($.index(board.get$Squares(), 0).get$PlacedPiece() == null)) {
            t1 = $.index(board.get$Squares(), 0).get$PlacedPiece();
            $.index(board.get$Squares(), 3).set$PlacedPiece(t1);
            $.index(board.get$Squares(), 0).set$PlacedPiece(null);
            board.set$BlackCastled(true);
            t1 = $.PieceMoving$($.index(board.get$Squares(), 3).get$PlacedPiece().get$PieceColor(), $.index(board.get$Squares(), 3).get$PlacedPiece().get$PieceType(), $.index(board.get$Squares(), 3).get$PlacedPiece().get$Moved(), 0, 3);
            board.get$LastMove().set$MovingPieceSecondary(t1);
            $.index(board.get$Squares(), 3).get$PlacedPiece().set$Moved(true);
            return;
          }
        }
      }
    }
  }
  return;
 },
 _initBoard$0: function() {
  var t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'Square'}));
  this.Squares = t1;
  for (var i = 0; i < 64; ++i) {
    $.indexSet(this.Squares, i, $.Square$empty());
  }
  this.LastMove = $.MoveContent$();
 },
 Board$fromBoard$1: function(board) {
  var t1 = $.ListFactory_List(64);
  $.setRuntimeTypeInfo(t1, ({E: 'Square'}));
  this.Squares = t1;
  for (var x = 0; x < 64; ++x) {
    if (!($.index(board.get$Squares(), x).get$PlacedPiece() == null)) $.indexSet(this.Squares, x, $.Square$($.index(board.get$Squares(), x).get$PlacedPiece()));
  }
  this.EndGamePhase = board.get$EndGamePhase();
  this.FiftyMove = board.get$FiftyMove();
  this.RepeatedMove = board.get$RepeatedMove();
  this.WhiteCastled = board.get$WhiteCastled();
  this.BlackCastled = board.get$BlackCastled();
  this.BlackCheck = board.get$BlackCheck();
  this.WhiteCheck = board.get$WhiteCheck();
  this.StaleMate = board.get$StaleMate();
  this.WhiteMate = board.get$WhiteMate();
  this.BlackMate = board.get$BlackMate();
  this.WhoseMove = board.get$WhoseMove();
  this.EnPassantPosition = board.get$EnPassantPosition();
  this.EnPassantColor = board.get$EnPassantColor();
  this.ZobristHash = board.get$ZobristHash();
  this.Score = board.get$Score();
  this.LastMove = $.MoveContent$fromMoveContent(board.get$LastMove());
  this.MoveCount = board.get$MoveCount();
 },
 Board$fromString$1: function(fen) {
  var t1 = ({});
  this._initBoard$0();
  t1.index_1 = 0;
  t1.spc_2 = 0;
  this.WhiteCastled = true;
  this.BlackCastled = true;
  t1.spacers_3 = 0;
  this.WhoseMove = $.CTC2;
  if ($.contains$1(fen, $.CTC11) === true) {
    this.EnPassantColor = $.CTC2;
    this.EnPassantPosition = 40;
  } else {
    if ($.contains$1(fen, $.CTC12) === true) {
      this.EnPassantColor = $.CTC2;
      this.EnPassantPosition = 41;
    } else {
      if ($.contains$1(fen, $.CTC13) === true) {
        this.EnPassantColor = $.CTC2;
        this.EnPassantPosition = 42;
      } else {
        if ($.contains$1(fen, $.CTC14) === true) {
          this.EnPassantColor = $.CTC2;
          this.EnPassantPosition = 43;
        } else {
          if ($.contains$1(fen, $.CTC15) === true) {
            this.EnPassantColor = $.CTC2;
            this.EnPassantPosition = 44;
          } else {
            if ($.contains$1(fen, $.CTC16) === true) {
              this.EnPassantColor = $.CTC2;
              this.EnPassantPosition = 45;
            } else {
              if ($.contains$1(fen, $.CTC17) === true) {
                this.EnPassantColor = $.CTC2;
                this.EnPassantPosition = 46;
              } else {
                if ($.contains$1(fen, $.CTC18) === true) {
                  this.EnPassantColor = $.CTC2;
                  this.EnPassantPosition = 47;
                }
              }
            }
          }
        }
      }
    }
  }
  if ($.contains$1(fen, $.CTC19) === true) {
    this.EnPassantColor = $.CTC2;
    this.EnPassantPosition = 16;
  } else {
    if ($.contains$1(fen, $.CTC20) === true) {
      this.EnPassantColor = $.CTC2;
      this.EnPassantPosition = 17;
    } else {
      if ($.contains$1(fen, $.CTC21) === true) {
        this.EnPassantColor = $.CTC2;
        this.EnPassantPosition = 18;
      } else {
        if ($.contains$1(fen, $.CTC22) === true) {
          this.EnPassantColor = $.CTC2;
          this.EnPassantPosition = 19;
        } else {
          if ($.contains$1(fen, $.CTC23) === true) {
            this.EnPassantColor = $.CTC2;
            this.EnPassantPosition = 20;
          } else {
            if ($.contains$1(fen, $.CTC24) === true) {
              this.EnPassantColor = $.CTC2;
              this.EnPassantPosition = 21;
            } else {
              if ($.contains$1(fen, $.CTC25) === true) {
                this.EnPassantColor = $.CTC2;
                this.EnPassantPosition = 22;
              } else {
                if ($.contains$1(fen, $.CTC26) === true) {
                  this.EnPassantColor = $.CTC2;
                  this.EnPassantPosition = 23;
                }
              }
            }
          }
        }
      }
    }
  }
  $.forEach($.splitChars(fen), new $.anon(this, t1));
 },
 Board$0: function() {
  this._initBoard$0();
 }
};

$$.Engine = {"":
 ["_board", "_moveArrays", "_pieceValidMoves", "_pieceMoves", "HumanPlayer", "PreviousChessBoard", "ChessBoard"],
 super: "Object",
 MovePiece$4: function(sourceColumn, sourceRow, destinationColumn, destinationRow) {
  var srcPosition = $.toInt($.add(sourceColumn, $.mul(sourceRow, 8)));
  var dstPosition = $.toInt($.add(destinationColumn, $.mul(destinationRow, 8)));
  var piece = $.index(this.ChessBoard.get$Squares(), srcPosition).get$PlacedPiece();
  this.PreviousChessBoard = $.Board$fromBoard(this.ChessBoard);
  this._board.MovePiece$4(this.ChessBoard, srcPosition, dstPosition, $.CTC8);
  this._pieceValidMoves.GenerateValidMoves$1(this.ChessBoard);
  if ($.eqB(piece.get$PieceColor(), $.CTC2)) {
    if (this.ChessBoard.get$WhiteCheck() === true) {
      this.ChessBoard = $.Board$fromBoard(this.PreviousChessBoard);
      this._pieceValidMoves.GenerateValidMoves$1(this.ChessBoard);
      return false;
    }
  } else {
    if ($.eqB(piece.get$PieceColor(), $.CTC4)) {
      if (this.ChessBoard.get$BlackCheck() === true) {
        this.ChessBoard = $.Board$fromBoard(this.PreviousChessBoard);
        this._pieceValidMoves.GenerateValidMoves$1(this.ChessBoard);
        return false;
      }
    }
  }
  return true;
 },
 IsValidMove$4: function(sourceColumn, sourceRow, destinationColumn, destinationRow) {
  var t1 = this.ChessBoard;
  if (t1 == null) return false;
  if (t1.get$Squares() == null) return false;
  var index = this._GetBoardIndex$2(sourceColumn, sourceRow);
  if ($.index(this.ChessBoard.get$Squares(), index).get$PlacedPiece() == null) return false;
  for (t1 = $.iterator($.index(this.ChessBoard.get$Squares(), index).get$PlacedPiece().get$ValidMoves()); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if ($.eqB($.toInt($.mod(t2, 8)), $.toInt(destinationColumn))) {
      if ($.eqB($.toInt($.div(t2, 8)), $.toInt(destinationRow))) return true;
    }
  }
  if ($.eqB(this._GetBoardIndex$2(destinationColumn, destinationRow), this.ChessBoard.get$EnPassantPosition())) return true;
  return false;
 },
 IsSquareWhoseMove$2: function(col, row) {
  var t1 = this.ChessBoard;
  if (t1 == null) return false;
  if (t1.get$Squares() == null) return false;
  var index = this._GetBoardIndex$2(col, row);
  if ($.index(this.ChessBoard.get$Squares(), index).get$PlacedPiece() == null) return false;
  if ($.eqB(this.GetPieceColorAtIndex$1(index), this.get$WhoseMove()) && !$.eqB(this.GetPieceTypeAtIndex$1(index), $.CTC10)) return true;
  return false;
 },
 GetValidMoves$2: function(boardColumn, boardRow) {
  var index = this._GetBoardIndex$2(boardColumn, boardRow);
  if ($.index(this.ChessBoard.get$Squares(), index).get$PlacedPiece() == null) return;
  var returnArray = $.ListFactory_List($.get$length($.index(this.ChessBoard.get$Squares(), index).get$PlacedPiece().get$ValidMoves()));
  $.setRuntimeTypeInfo(returnArray, ({E: 'List<int>'}));
  for (var t1 = $.iterator($.index(this.ChessBoard.get$Squares(), index).get$PlacedPiece().get$ValidMoves()), counter = 0; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    var t3 = $.ListFactory_List(2);
    $.setRuntimeTypeInfo(t3, ({E: 'int'}));
    var t4 = returnArray.length;
    if (counter < 0 || counter >= t4) throw $.ioore(counter);
    returnArray[counter] = t3;
    t3 = returnArray.length;
    if (counter < 0 || counter >= t3) throw $.ioore(counter);
    $.indexSet(returnArray[counter], 0, $.toInt($.mod(t2, 8)));
    var t5 = returnArray.length;
    if (counter < 0 || counter >= t5) throw $.ioore(counter);
    $.indexSet(returnArray[counter], 1, $.toInt($.div(t2, 8)));
    ++counter;
  }
  return returnArray;
 },
 GetPieceTypeAtIndex$1: function(index) {
  if ($.index(this.ChessBoard.get$Squares(), index).get$PlacedPiece() == null) return $.CTC10;
  return $.index(this.ChessBoard.get$Squares(), index).get$PlacedPiece().get$PieceType();
 },
 GetPieceColorAtIndex$1: function(index) {
  if ($.index(this.ChessBoard.get$Squares(), index).get$PlacedPiece() == null) return $.CTC2;
  return $.index(this.ChessBoard.get$Squares(), index).get$PlacedPiece().get$PieceColor();
 },
 _GetBoardIndex$2: function(BoardColumn, BoardRow) {
  return $.toInt($.add(BoardColumn, $.mul(BoardRow, 8)));
 },
 _GenerateValidMoves$0: function() {
  this._pieceValidMoves.GenerateValidMoves$1(this.ChessBoard);
 },
 _InitiateBoard$1: function(fen) {
  this.HumanPlayer = $.CTC2;
  this.ChessBoard = $.Board$fromString(fen);
  this.ChessBoard.set$WhoseMove($.CTC2);
  this._pieceMoves = $.PieceMoves$();
  this._moveArrays = this._pieceMoves.InitiateChessPieceMotion$0();
  this._pieceValidMoves = $.PieceValidMoves$(this._moveArrays);
  this._board = $.Board$();
  this._GenerateValidMoves$0();
 },
 set$WhoseMove: function(value) {
  this.ChessBoard.set$WhoseMove(value);
  return value;
 },
 get$WhoseMove: function() {
  return this.ChessBoard.get$WhoseMove();
 },
 Engine$0: function() {
  this._InitiateBoard$1('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
 }
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 $call$0: function() {
  return this.closure_0.$call$0();
 }
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 $call$0: function() {
  return this.closure_2.$call$1(this.arg1_1);
 }
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 $call$0: function() {
  return this.closure_5.$call$2(this.arg1_4, this.arg2_3);
 }
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 $call$2: function(k, v) {
  this.box_0.first_1 !== true && $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
 }
};

$$.Game_draw_anon = {"":
 [],
 super: "Closure",
 $call$1: function(p) {
  return p.draw$0();
 }
};

$$.anon = {"":
 ["this_4", "box_0"],
 super: "Closure",
 $call$1: function(c) {
  if ($.ltB(this.box_0.index_1, 64) && $.eqB(this.box_0.spc_2, 0)) {
    if ($.eqB(c, '1') && $.ltB(this.box_0.index_1, 63)) {
      var index = $.add(this.box_0.index_1, 1);
      this.box_0.index_1 = index;
    } else {
      if ($.eqB(c, '2') && $.ltB(this.box_0.index_1, 62)) {
        index = $.add(this.box_0.index_1, 2);
        this.box_0.index_1 = index;
      } else {
        if ($.eqB(c, '3') && $.ltB(this.box_0.index_1, 61)) {
          index = $.add(this.box_0.index_1, 3);
          this.box_0.index_1 = index;
        } else {
          if ($.eqB(c, '4') && $.ltB(this.box_0.index_1, 60)) {
            index = $.add(this.box_0.index_1, 4);
            this.box_0.index_1 = index;
          } else {
            if ($.eqB(c, '5') && $.ltB(this.box_0.index_1, 59)) {
              index = $.add(this.box_0.index_1, 5);
              this.box_0.index_1 = index;
            } else {
              if ($.eqB(c, '6') && $.ltB(this.box_0.index_1, 58)) {
                index = $.add(this.box_0.index_1, 6);
                this.box_0.index_1 = index;
              } else {
                if ($.eqB(c, '7') && $.ltB(this.box_0.index_1, 57)) {
                  index = $.add(this.box_0.index_1, 7);
                  this.box_0.index_1 = index;
                } else {
                  if ($.eqB(c, '8') && $.ltB(this.box_0.index_1, 56)) {
                    index = $.add(this.box_0.index_1, 8);
                    this.box_0.index_1 = index;
                  } else {
                    if ($.eqB(c, 'P')) {
                      var t1 = $.Piece$fromType($.CTC3, $.CTC2);
                      $.index(this.this_4.get$Squares(), this.box_0.index_1).set$PlacedPiece(t1);
                      $.index(this.this_4.get$Squares(), this.box_0.index_1).get$PlacedPiece().set$Moved(true);
                      index = $.add(this.box_0.index_1, 1);
                      this.box_0.index_1 = index;
                    } else {
                      if ($.eqB(c, 'N')) {
                        t1 = $.Piece$fromType($.CTC5, $.CTC2);
                        $.index(this.this_4.get$Squares(), this.box_0.index_1).set$PlacedPiece(t1);
                        $.index(this.this_4.get$Squares(), this.box_0.index_1).get$PlacedPiece().set$Moved(true);
                        index = $.add(this.box_0.index_1, 1);
                        this.box_0.index_1 = index;
                      } else {
                        if ($.eqB(c, 'B')) {
                          t1 = $.Piece$fromType($.CTC6, $.CTC2);
                          $.index(this.this_4.get$Squares(), this.box_0.index_1).set$PlacedPiece(t1);
                          $.index(this.this_4.get$Squares(), this.box_0.index_1).get$PlacedPiece().set$Moved(true);
                          index = $.add(this.box_0.index_1, 1);
                          this.box_0.index_1 = index;
                        } else {
                          if ($.eqB(c, 'R')) {
                            t1 = $.Piece$fromType($.CTC7, $.CTC2);
                            $.index(this.this_4.get$Squares(), this.box_0.index_1).set$PlacedPiece(t1);
                            $.index(this.this_4.get$Squares(), this.box_0.index_1).get$PlacedPiece().set$Moved(true);
                            index = $.add(this.box_0.index_1, 1);
                            this.box_0.index_1 = index;
                          } else {
                            if ($.eqB(c, 'Q')) {
                              t1 = $.Piece$fromType($.CTC8, $.CTC2);
                              $.index(this.this_4.get$Squares(), this.box_0.index_1).set$PlacedPiece(t1);
                              $.index(this.this_4.get$Squares(), this.box_0.index_1).get$PlacedPiece().set$Moved(true);
                              index = $.add(this.box_0.index_1, 1);
                              this.box_0.index_1 = index;
                            } else {
                              if ($.eqB(c, 'K')) {
                                t1 = $.Piece$fromType($.CTC9, $.CTC2);
                                $.index(this.this_4.get$Squares(), this.box_0.index_1).set$PlacedPiece(t1);
                                $.index(this.this_4.get$Squares(), this.box_0.index_1).get$PlacedPiece().set$Moved(true);
                                index = $.add(this.box_0.index_1, 1);
                                this.box_0.index_1 = index;
                              } else {
                                if ($.eqB(c, 'p')) {
                                  t1 = $.Piece$fromType($.CTC3, $.CTC4);
                                  $.index(this.this_4.get$Squares(), this.box_0.index_1).set$PlacedPiece(t1);
                                  $.index(this.this_4.get$Squares(), this.box_0.index_1).get$PlacedPiece().set$Moved(true);
                                  index = $.add(this.box_0.index_1, 1);
                                  this.box_0.index_1 = index;
                                } else {
                                  if ($.eqB(c, 'n')) {
                                    t1 = $.Piece$fromType($.CTC5, $.CTC4);
                                    $.index(this.this_4.get$Squares(), this.box_0.index_1).set$PlacedPiece(t1);
                                    $.index(this.this_4.get$Squares(), this.box_0.index_1).get$PlacedPiece().set$Moved(true);
                                    index = $.add(this.box_0.index_1, 1);
                                    this.box_0.index_1 = index;
                                  } else {
                                    if ($.eqB(c, 'b')) {
                                      t1 = $.Piece$fromType($.CTC6, $.CTC4);
                                      $.index(this.this_4.get$Squares(), this.box_0.index_1).set$PlacedPiece(t1);
                                      $.index(this.this_4.get$Squares(), this.box_0.index_1).get$PlacedPiece().set$Moved(true);
                                      index = $.add(this.box_0.index_1, 1);
                                      this.box_0.index_1 = index;
                                    } else {
                                      if ($.eqB(c, 'r')) {
                                        t1 = $.Piece$fromType($.CTC7, $.CTC4);
                                        $.index(this.this_4.get$Squares(), this.box_0.index_1).set$PlacedPiece(t1);
                                        $.index(this.this_4.get$Squares(), this.box_0.index_1).get$PlacedPiece().set$Moved(true);
                                        index = $.add(this.box_0.index_1, 1);
                                        this.box_0.index_1 = index;
                                      } else {
                                        if ($.eqB(c, 'q')) {
                                          t1 = $.Piece$fromType($.CTC8, $.CTC4);
                                          $.index(this.this_4.get$Squares(), this.box_0.index_1).set$PlacedPiece(t1);
                                          $.index(this.this_4.get$Squares(), this.box_0.index_1).get$PlacedPiece().set$Moved(true);
                                          index = $.add(this.box_0.index_1, 1);
                                          this.box_0.index_1 = index;
                                        } else {
                                          if ($.eqB(c, 'k')) {
                                            t1 = $.Piece$fromType($.CTC9, $.CTC4);
                                            $.index(this.this_4.get$Squares(), this.box_0.index_1).set$PlacedPiece(t1);
                                            $.index(this.this_4.get$Squares(), this.box_0.index_1).get$PlacedPiece().set$Moved(true);
                                            index = $.add(this.box_0.index_1, 1);
                                            this.box_0.index_1 = index;
                                          } else {
                                            if (!$.eqB(c, '/')) {
                                              if ($.eqB(c, ' ')) {
                                                var spc = $.add(this.box_0.spc_2, 1);
                                                this.box_0.spc_2 = spc;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  } else {
    if ($.eqB(c, 'w')) this.this_4.set$WhoseMove($.CTC2);
    else {
      if ($.eqB(c, 'b')) this.this_4.set$WhoseMove($.CTC4);
      else {
        if ($.eqB(c, 'K')) {
          if (!($.index(this.this_4.get$Squares(), 60).get$PlacedPiece() == null)) {
            $.eqB($.index(this.this_4.get$Squares(), 60).get$PlacedPiece().get$PieceType(), $.CTC9) && $.index(this.this_4.get$Squares(), 60).get$PlacedPiece().set$Moved(false);
          }
          if (!($.index(this.this_4.get$Squares(), 63).get$PlacedPiece() == null)) {
            $.eqB($.index(this.this_4.get$Squares(), 63).get$PlacedPiece().get$PieceType(), $.CTC7) && $.index(this.this_4.get$Squares(), 63).get$PlacedPiece().set$Moved(false);
          }
          this.this_4.set$WhiteCastled(false);
        } else {
          if ($.eqB(c, 'Q')) {
            if (!($.index(this.this_4.get$Squares(), 60).get$PlacedPiece() == null)) {
              $.eqB($.index(this.this_4.get$Squares(), 60).get$PlacedPiece().get$PieceType(), $.CTC9) && $.index(this.this_4.get$Squares(), 60).get$PlacedPiece().set$Moved(false);
            }
            if (!($.index(this.this_4.get$Squares(), 56).get$PlacedPiece() == null)) {
              $.eqB($.index(this.this_4.get$Squares(), 56).get$PlacedPiece().get$PieceType(), $.CTC7) && $.index(this.this_4.get$Squares(), 56).get$PlacedPiece().set$Moved(false);
            }
            this.this_4.set$WhiteCastled(false);
          } else {
            if ($.eqB(c, 'k')) {
              if (!($.index(this.this_4.get$Squares(), 4).get$PlacedPiece() == null)) {
                $.eqB($.index(this.this_4.get$Squares(), 4).get$PlacedPiece().get$PieceType(), $.CTC9) && $.index(this.this_4.get$Squares(), 4).get$PlacedPiece().set$Moved(false);
              }
              if (!($.index(this.this_4.get$Squares(), 7).get$PlacedPiece() == null)) {
                $.eqB($.index(this.this_4.get$Squares(), 7).get$PlacedPiece().get$PieceType(), $.CTC7) && $.index(this.this_4.get$Squares(), 7).get$PlacedPiece().set$Moved(false);
              }
              this.this_4.set$BlackCastled(false);
            } else {
              if ($.eqB(c, 'q')) {
                if (!($.index(this.this_4.get$Squares(), 4).get$PlacedPiece() == null)) {
                  $.eqB($.index(this.this_4.get$Squares(), 4).get$PlacedPiece().get$PieceType(), $.CTC9) && $.index(this.this_4.get$Squares(), 4).get$PlacedPiece().set$Moved(false);
                }
                if (!($.index(this.this_4.get$Squares(), 0).get$PlacedPiece() == null)) {
                  $.eqB($.index(this.this_4.get$Squares(), 0).get$PlacedPiece().get$PieceType(), $.CTC7) && $.index(this.this_4.get$Squares(), 0).get$PlacedPiece().set$Moved(false);
                }
                this.this_4.set$BlackCastled(false);
              } else {
                if ($.eqB(c, ' ')) {
                  var spacers = $.add(this.box_0.spacers_3, 1);
                  this.box_0.spacers_3 = spacers;
                } else {
                  if ($.eqB(c, '1') && $.eqB(this.box_0.spacers_3, 4)) {
                    t1 = $.add($.mul(this.this_4.get$FiftyMove(), 10), 1);
                    this.this_4.set$FiftyMove(t1);
                  } else {
                    if ($.eqB(c, '2') && $.eqB(this.box_0.spacers_3, 4)) {
                      t1 = $.add($.mul(this.this_4.get$FiftyMove(), 10), 2);
                      this.this_4.set$FiftyMove(t1);
                    } else {
                      if ($.eqB(c, '3') && $.eqB(this.box_0.spacers_3, 4)) {
                        t1 = $.add($.mul(this.this_4.get$FiftyMove(), 10), 3);
                        this.this_4.set$FiftyMove(t1);
                      } else {
                        if ($.eqB(c, '4') && $.eqB(this.box_0.spacers_3, 4)) {
                          t1 = $.add($.mul(this.this_4.get$FiftyMove(), 10), 4);
                          this.this_4.set$FiftyMove(t1);
                        } else {
                          if ($.eqB(c, '5') && $.eqB(this.box_0.spacers_3, 4)) {
                            t1 = $.add($.mul(this.this_4.get$FiftyMove(), 10), 5);
                            this.this_4.set$FiftyMove(t1);
                          } else {
                            if ($.eqB(c, '6') && $.eqB(this.box_0.spacers_3, 4)) {
                              t1 = $.add($.mul(this.this_4.get$FiftyMove(), 10), 6);
                              this.this_4.set$FiftyMove(t1);
                            } else {
                              if ($.eqB(c, '7') && $.eqB(this.box_0.spacers_3, 4)) {
                                t1 = $.add($.mul(this.this_4.get$FiftyMove(), 10), 7);
                                this.this_4.set$FiftyMove(t1);
                              } else {
                                if ($.eqB(c, '8') && $.eqB(this.box_0.spacers_3, 4)) {
                                  t1 = $.add($.mul(this.this_4.get$FiftyMove(), 10), 8);
                                  this.this_4.set$FiftyMove(t1);
                                } else {
                                  if ($.eqB(c, '9') && $.eqB(this.box_0.spacers_3, 4)) {
                                    t1 = $.add($.mul(this.this_4.get$FiftyMove(), 10), 9);
                                    this.this_4.set$FiftyMove(t1);
                                  } else {
                                    if ($.eqB(c, '0') && $.eqB(this.box_0.spacers_3, 4)) {
                                      t1 = $.add($.mul(this.this_4.get$MoveCount(), 10), 0);
                                      this.this_4.set$MoveCount(t1);
                                    } else {
                                      if ($.eqB(c, '1') && $.eqB(this.box_0.spacers_3, 5)) {
                                        t1 = $.add($.mul(this.this_4.get$MoveCount(), 10), 1);
                                        this.this_4.set$MoveCount(t1);
                                      } else {
                                        if ($.eqB(c, '2') && $.eqB(this.box_0.spacers_3, 5)) {
                                          t1 = $.add($.mul(this.this_4.get$MoveCount(), 10), 2);
                                          this.this_4.set$MoveCount(t1);
                                        } else {
                                          if ($.eqB(c, '3') && $.eqB(this.box_0.spacers_3, 5)) {
                                            t1 = $.add($.mul(this.this_4.get$MoveCount(), 10), 3);
                                            this.this_4.set$MoveCount(t1);
                                          } else {
                                            if ($.eqB(c, '4') && $.eqB(this.box_0.spacers_3, 5)) {
                                              t1 = $.add($.mul(this.this_4.get$MoveCount(), 10), 4);
                                              this.this_4.set$MoveCount(t1);
                                            } else {
                                              if ($.eqB(c, '5') && $.eqB(this.box_0.spacers_3, 5)) {
                                                t1 = $.add($.mul(this.this_4.get$MoveCount(), 10), 5);
                                                this.this_4.set$MoveCount(t1);
                                              } else {
                                                if ($.eqB(c, '6') && $.eqB(this.box_0.spacers_3, 5)) {
                                                  t1 = $.add($.mul(this.this_4.get$MoveCount(), 10), 6);
                                                  this.this_4.set$MoveCount(t1);
                                                } else {
                                                  if ($.eqB(c, '7') && $.eqB(this.box_0.spacers_3, 5)) {
                                                    t1 = $.add($.mul(this.this_4.get$MoveCount(), 10), 7);
                                                    this.this_4.set$MoveCount(t1);
                                                  } else {
                                                    if ($.eqB(c, '8') && $.eqB(this.box_0.spacers_3, 5)) {
                                                      t1 = $.add($.mul(this.this_4.get$MoveCount(), 10), 8);
                                                      this.this_4.set$MoveCount(t1);
                                                    } else {
                                                      if ($.eqB(c, '9') && $.eqB(this.box_0.spacers_3, 5)) {
                                                        t1 = $.add($.mul(this.this_4.get$MoveCount(), 10), 9);
                                                        this.this_4.set$MoveCount(t1);
                                                      } else {
                                                        if ($.eqB(c, '0') && $.eqB(this.box_0.spacers_3, 5)) {
                                                          t1 = $.add($.mul(this.this_4.get$MoveCount(), 10), 0);
                                                          this.this_4.set$MoveCount(t1);
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
 }
};

$$.anon0 = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(e) {
  this.this_0.get$board().selectSquare$2(e.get$offsetX(), e.get$offsetY());
 }
};

$$.anon1 = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(e) {
  this.this_0.draw$0();
 }
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$1: function(entry) {
  this.f_0.$call$2(entry.get$key(), entry.get$value());
 }
};

$$.Board_draw_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return v.draw$1(this.this_0.get$ctx());
 }
};

$$.Board_selectSquare_anon = {"":
 ["this_6", "x_5", "y_4"],
 super: "Closure",
 $call$2: function(k, v) {
  if ($.contains$2(v, this.x_5, this.y_4) === true) {
    $.print('engine.IsSquareWhoseMove(v.col, v.row) = ' + $.S(this.this_6.get$engine().IsSquareWhoseMove$2(v.get$col(), v.get$row())));
    if (this.this_6.get$engine().IsSquareWhoseMove$2(v.get$col(), v.get$row()) === true) {
      v.set$highlighted(true);
      this.this_6.set$selectedSquare(v);
      $.forEach(this.this_6.get$engine().GetValidMoves$2(v.get$col(), v.get$row()), new $.Board_selectSquare_anon3(this.this_6));
    }
  } else v.set$highlighted(false);
 }
};

$$.Board_selectSquare_anon3 = {"":
 ["this_7"],
 super: "Closure",
 $call$1: function(sq) {
  this.this_7.highlight$2($.index(sq, 0), $.index(sq, 1));
 }
};

$$.Board_selectSquare_anon0 = {"":
 ["this_10", "x_9", "box_0", "y_8"],
 super: "Closure",
 $call$2: function(k, v) {
  if ($.contains$2(v, this.x_9, this.y_8) === true) {
    if (this.this_10.get$engine().IsSquareWhoseMove$2(v.get$col(), v.get$row()) === true) {
      v.set$highlighted(true);
      this.box_0.tmp_selectedSquare_2 = v;
      this.box_0.selectedSquareMoves_1 = false;
    }
  } else v.set$highlighted(false);
 }
};

$$.Board_selectSquare_anon1 = {"":
 ["x_12", "box_0", "y_11"],
 super: "Closure",
 $call$2: function(kk, vv) {
  if ($.contains$2(vv, this.x_12, this.y_11) === true) this.box_0.dest_square_3 = vv;
 }
};

$$.Board_selectSquare_anon2 = {"":
 ["dest_sq_14", "src_sq_13"],
 super: "Closure",
 $call$1: function(p) {
  if ($.eqB(p.get$sq(), this.src_sq_13)) {
    $.print('setting p=' + $.S(p) + ' .sq = ' + $.S(this.dest_sq_14));
    p.set$sq(this.dest_sq_14);
  }
 }
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_0.$call$1(key);
 }
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_10;
  var index = $.add(t2, 1);
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$value());
 }
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, value);
 }
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_11;
  var index = $.add(t2, 1);
  this.box_0.index_11 = index;
  $.indexSet(t1, t2, entry.get$key());
 }
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_10;
  var i = $.add(t2, 1);
  this.box_0.i_10 = i;
  $.indexSet(t1, t2, key);
 }
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 $call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
 }
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  if (this.this_0.runIteration$0() !== true) return;
  $._window().setTimeout$2(this, 0);
 }
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

Isolate.$defineClass('BoundClosure', 'Closure', ['self', 'target'], {
$call$1: function(p0) { return this.self[this.target](p0); }
});
Isolate.$defineClass('BoundClosure0', 'Closure', ['self', 'target'], {
$call$0: function() { return this.self[this.target](); }
});
Isolate.$defineClass('BoundClosure1', 'Closure', ['self', 'target'], {
$call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
});
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a * b;
  return a.operator$mul$1(b);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true) return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$._window = function() {
  return typeof window != 'undefined' ? window : (void 0);;
};

$._AudioContextEventsImpl$ = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.floor$0();
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b) === true;
  }
  return a === b;
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref) return true;
  }
  return false;
};

$.isJsArray = function(value) {
  return !(value == null) && (value.constructor === Array);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.Utils_toSquare = function(_col, _row) {
  if ($.ltB(_row, 1) || ($.gtB(_row, 8) || ($.ltB(_col, 1) || $.gtB(_col, 8)))) return;
  if (typeof _col !== 'number') throw $.iae(_col);
  var t1 = 96 + _col;
  if (typeof _row !== 'number') throw $.iae(_row);
  return $.Strings_String$fromCharCodes([t1, 48 + _row]);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length;
  return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a >= b;
  return a.operator$ge$1(b);
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.Board$fromBoard = function(board) {
  var t1 = new $.Board(0, null, 0, null, null, false, false, false, 0, 0, false, false, false, false, false, null, 0, false, null);
  t1.Board$fromBoard$1(board);
  return t1;
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'MSStyleCSSProperties')) return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'CanvasPixelArray')) return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLPhraseElement')) return 'HTMLElement';
  if ($.eqB(name$, 'MouseWheelEvent')) return 'WheelEvent';
  return name$;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && ($.isEmpty(name$) !== true && !(name$ === 'Object'))) return name$;
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$.Engine$ = function() {
  var t1 = new $.Engine(null, null, null, null, null, null, null);
  t1.Engine$0();
  return t1;
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) return $._JsSerializer$().traverse$1(message);
  return $._JsCopier$().traverse$1(message);
};

$.PieceMoving$fromPieceMoving = function(pieceMoving) {
  var t1 = new $.PieceMoving(null, null, null, null, null);
  t1.PieceMoving$fromPieceMoving$1(pieceMoving);
  return t1;
};

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) return $.truncate((a) / (b));
  return a.operator$tdiv$1(b);
};

$.Primitives_printString = function(string) {
  if (typeof dartPrint == "function") {
    dartPrint(string);
    return;
  }
  if (typeof console == "object") {
    console.log(string);
    return;
  }
  if (typeof write == "function") {
    write(string);
    write("\n");
  }
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') return 'DOMWindow';
  if (name$ === 'CanvasPixelArray') return 'Uint8ClampedArray';
  return name$;
};

$.Board$ = function() {
  var t1 = new $.Board(0, null, 0, null, null, false, false, false, 0, 0, false, false, false, false, false, null, 0, false, null);
  t1.Board$0();
  return t1;
};

$.Board$0 = function(ctx, engine, height, width) {
  var t1 = new $.Board0('rgb(251, 246, 229)', 'rgb(0, 127, 0)', 'rgba(207, 247, 0, 0.9)', null, null, null, null, height, width, null, null, ctx, engine);
  t1.Board$4(ctx, engine, height, width);
  return t1;
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31) return 0;
      return a >>> b;
    }
    if (b > 31) b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null) endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$)) throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.BoardSquare$ = function(col, row, x, y, w, h, fill, highlighted, highlightFill) {
  return new $.BoardSquare(highlightFill, highlighted, fill, h, w, y, x, col, row);
};

$._DOMApplicationCacheEventsImpl$ = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0)) return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  if ($.eqB(numberOfArguments, 1)) return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  if ($.eqB(numberOfArguments, 2)) return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b);
};

$.Strings_String$fromCharCodes = function(charCodes) {
  return $.StringBase_createFromCharCodes(charCodes);
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object' || inputTable === null || (inputTable.constructor !== Array && !inputTable.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; t1 = inputTable.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object' || tagNames === null || (tagNames.constructor !== Array && !tagNames.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(2, inputTable, result, tagNames, tag, i, tags, set);
    for (var j = 0; t1 = tagNames.length, j < t1; ++j) {
      if (j < 0 || j >= t1) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$(tag, tags, set));
  }
  return result;
  var t1;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a * b) : $.mul$slow(a, b);
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null) {
    if ($._Device_isFirefox() === true) $._cachedBrowserPrefix = '-moz-';
    else $._cachedBrowserPrefix = '-webkit-';
  }
  return $._cachedBrowserPrefix;
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || (typeof x === 'string' || (typeof x === 'number' || typeof x === 'boolean'));
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    !first && $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$._EventsImpl$ = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1.HashSetImplementation$0();
  return t1;
};

$._IDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') return receiver.split(pattern);
  if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp) return receiver.split($.regExpGetNative(pattern));
  throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.PieceMoves$ = function() {
  return new $.PieceMoves(null);
};

$._SpeechRecognitionEventsImpl$ = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length === 0;
  return receiver.isEmpty$0();
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) return;
  return result;
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b) === true;
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a + b) : $.add$slow(a, b);
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') return !($.indexOf$2(receiver, other, startIndex) === -1);
  if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp) return other.hasMatch$1($.substring$1(receiver, startIndex));
  return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.Game$ = function(canvas, engine) {
  var t1 = new $.Game(null, null, canvas, null, null, engine);
  t1.Game$2(canvas, engine);
  return t1;
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.Piece$fromType = function(chessPiece, chessPieceColor) {
  var t1 = new $.Piece(null, false, null, null, 0, 0, null, null, null, null);
  t1.Piece$fromType$2(chessPiece, chessPieceColor);
  return t1;
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = (String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1]);
    if (typeof decompiled === 'string') name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var result = (a % b);
    if (result === 0) return 0;
    if (result > 0) return result;
    b = (b);
    if (b < 0) return result - b;
    return result + b;
  }
  return a.operator$mod$1(b);
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  multiLine === true && $.add$1(sb, 'm');
  ignoreCase === true && $.add$1(sb, 'i');
  global === true && $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, (String(e))));
  }
};

$.splitChars = function(receiver) {
  if (!(typeof receiver === 'string')) return receiver.splitChars$0();
  return receiver.split("");
};

$.BadNumberFormatException$ = function(_s) {
  return new $.BadNumberFormatException(_s);
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$._XMLHttpRequestEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection())) {
    if ($.Collections__containsRef(visiting, o) === true) {
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    } else $.Collections__emitCollection(o, result, visiting);
  } else {
    if (typeof o === 'object' && o !== null && o.is$Map()) {
      if ($.Collections__containsRef(visiting, o) === true) $.add$1(result, '{...}');
      else $.Maps__emitMap(o, result, visiting);
    } else {
      $.add$1(result, o == null ? 'null' : o);
    }
  }
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = ({});
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$._TextTrackCueEventsImpl$ = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, (receiver.length));
  }
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0) return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.Board$fromString = function(fen) {
  {};
  var t1 = new $.Board(0, null, 0, null, null, false, false, false, 0, 0, false, false, false, false, false, null, 0, false, null);
  t1.Board$fromString$1(fen);
  return t1;
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1._Manager$0();
  return t1;
};

$._FrameSetElementEventsImpl$ = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a + b;
  return a.operator$add$1(b);
};

$.ListFactory_List$from = function(other) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.Primitives_newList = function(length$) {
  if (length$ == null) return new Array();
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0))) || length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  var game = $.Game$($.query('#board'), $.Engine$());
  $.window().requestAnimationFrame$1(game.get$anim());
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$.MoveArrays$ = function() {
  return new $.MoveArrays(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._MediaElementEventsImpl$ = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._IDBTransactionEventsImpl$ = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator(false, null, _str, $.JSSyntaxRegExp$_globalVersionOf(re));
};

$._BodyElementEventsImpl$ = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.PieceMoving$fromChessPieceType = function(pieceType) {
  var t1 = new $.PieceMoving(null, null, null, null, null);
  t1.PieceMoving$fromChessPieceType$1(pieceType);
  return t1;
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') return isNaN(receiver);
  return receiver.isNaN$0();
};

$.isInfinite = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.isInfinite$0();
  return (receiver == Infinity) || (receiver == -Infinity);
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(1, needle, haystack, length$, patternLength, result);
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.Piece$ = function(ctx, ratio, name$, data, sq) {
  var t1 = new $.Piece0(name$, null, data, sq, ctx, ratio, null);
  t1.Piece$5(ctx, ratio, name$, data, sq);
  return t1;
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.PieceTaken$fromChessPieceType = function(pieceType) {
  var t1 = new $.PieceTaken(null, null, null, null);
  t1.PieceTaken$fromChessPieceType$1(pieceType);
  return t1;
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) return false;
  if (typeof otherLength !== 'number') throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.PieceTaken$ = function(pieceColor, pieceType, moved, position) {
  var t1 = new $.PieceTaken(null, null, null, null);
  t1.PieceTaken$4(pieceColor, pieceType, moved, position);
  return t1;
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(list, 0);
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$._WorkerEventsImpl$ = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b) === true;
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null) return;
  var function$ = (closure.$identity);
  if (!!function$) return function$;
  function$ = (function() {
    return $.invokeClosure.$call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  });
  closure.$identity = function$;
  return function$;
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._InputElementEventsImpl$ = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._TextTrackListEventsImpl$ = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata0 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$._DeprecatedPeerConnectionEventsImpl$ = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  return r == null ? (regExp._re = $.regExpMakeNative(regExp, false)) : r;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$(obj, name$, arguments$, null));
};

$.checkNull = function(object) {
  if (object == null) throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.Square$ = function(piece) {
  var t1 = new $.Square(null);
  t1.Square$1(piece);
  return t1;
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$._EventListenerListImpl$ = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$._fillStatics = function(context) {
    $globals = context.isolateStatics;
  $static_init();
;
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.MoveContent$ = function() {
  var t1 = new $.MoveContent(null, false, null, null, false);
  t1.MoveContent$0();
  return t1;
};

$.Piece$fromPiece = function(piece) {
  var t1 = new $.Piece(null, false, null, null, 0, 0, null, null, null, null);
  t1.Piece$fromPiece$1(piece);
  return t1;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') return true;
    $.checkNull(b);
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  return false;
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a < b;
  return a.operator$lt$1(b);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index)) throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.PieceMoveSet$ = function(Moves) {
  return new $.PieceMoveSet(Moves);
};

$._globalState = function() {
  return $globalState;;
};

$._globalState0 = function(val) {
  $globalState = val;;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$._Elements_ImageElement = function(src, width, height) {
  var _e = $._document().$dom_createElement$1('img');
  !(src == null) && _e.set$src(src);
  !(width == null) && _e.set$width(width);
  !(height == null) && _e.set$height(height);
  return _e;
};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || ((strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())) return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings) === true) {
    for (var i = 0; i < length$; ++i) {
      var t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = strings[i];
      $.checkNull(t2);
      if (!(typeof t2 === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(t2));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      t2 = strings[i];
      $.checkNull(t2);
      if (!(typeof t2 === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(t2));
      t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = t2;
    }
  }
  return array;
};

$.IndexOutOfRangeException$ = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$((exception.stack));
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.PieceMoving$ = function(pieceColor, pieceType, moved, srcPosition, dstPosition) {
  var t1 = new $.PieceMoving(null, null, null, null, null);
  t1.PieceMoving$5(pieceColor, pieceType, moved, srcPosition, dstPosition);
  return t1;
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  }
  return receiver.charCodeAt$1(index);
};

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._MediaStreamTrackListEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackListEventsImpl(_ptr);
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.toInt$0();
  if ($.isNaN(receiver) === true) throw $.captureStackTrace($.BadNumberFormatException$('NaN'));
  if ($.isInfinite(receiver) === true) throw $.captureStackTrace($.BadNumberFormatException$('Infinity'));
  var truncated = $.truncate(receiver);
  return (truncated == -0.0) ? 0 : truncated;
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: '_IsolateEvent'}));
  return new $._EventLoop(t1);
};

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null) {
    if ($.isJsArray(value) === true) return $.Collections_collectionToString(value);
    return value.toString$0();
  }
  if (value === 0 && (1 / value) < 0) return '-0.0';
  if (value == null) return 'null';
  if (typeof value == "function") return 'Closure';
  return String(value);
};

$._MediaStreamEventsImpl$ = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.print = function(obj) {
  return $.Primitives_printString($.toString(obj));
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a / b) : $.div$slow(a, b);
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f == null) && (!!f.methods)) return f.methods;
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC31)[name$]);
  !(dartMethod == null) && (methods['Object'] = dartMethod);
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.Primitives_stringFromCharCodes = function(charCodes) {
  for (var t1 = $.iterator(charCodes); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (!((typeof t2 === 'number') && (t2 === (t2 | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(t2));
  }
  return String.fromCharCode.apply(null, charCodes);
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $._Lists_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else receiver.set$length(newLength);
  return newLength;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument')) return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent')) return 'MessageEvent';
  return name$;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a > b;
  return a.operator$gt$1(b);
};

$.Square$empty = function() {
  var t1 = new $.Square(null);
  t1.Square$empty$0();
  return t1;
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.MoveContent$fromMoveContent = function(moveContent) {
  var t1 = new $.MoveContent(null, false, null, null, false);
  t1.MoveContent$fromMoveContent$1(moveContent);
  return t1;
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.forEach$1(f);
  return $.Collections_forEach(receiver, f);
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string')) return receiver.hashCode$0();
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + (receiver.charCodeAt(i));
    var hash1 = 536870911 & hash0 + (524287 & hash0 << 10);
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + (67108863 & hash << 3);
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + (16383 & hash0 << 15);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  }
  return result;
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $.Arrays_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) return false;
  return other == receiver.substring(0, length$);
};

$.StringBase_createFromCharCodes = function(charCodes) {
  $.checkNull(charCodes);
  if ($.isJsArray(charCodes) !== true) {
    if (!((typeof charCodes === 'object' && charCodes !== null) && (((charCodes.constructor === Array) || charCodes.is$List())))) throw $.captureStackTrace($.IllegalArgumentException$(charCodes));
    var charCodes0 = $.ListFactory_List$from(charCodes);
    charCodes = charCodes0;
  }
  return $.Primitives_stringFromCharCodes(charCodes);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  if (method == null && !($._dynamicMetadata0() == null)) {
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = (methods[entry.get$tag()]);
        if (!(method == null)) break;
      }
    }
  }
  if (method == null) method = (methods['Object']);
  var proto = (Object.getPrototypeOf(obj));
  if (method == null) method = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  (!proto.hasOwnProperty(name$)) && $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$._document = function() {
  return document;;
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) return $.typeNameInChrome;
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC30) === true) return $.typeNameInChrome;
  if ($.contains$1(userAgent, 'Firefox') === true) return $.typeNameInFirefox;
  if ($.contains$1(userAgent, 'MSIE') === true) return $.typeNameInIE;
  return $.constructorNameFallback;
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) return a[key];
  }
  return $.index$slow(a, index);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$.PieceValidMoves$ = function(_moveArrays) {
  return new $.PieceValidMoves(null, null, null, null, _moveArrays);
};

$._XMLHttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.query = function(selector) {
  return $._document().query$1(selector);
};

$.captureStackTrace = function(ex) {
  if (ex == null) ex = $.CTC0;
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b);
  }
  return a === b;
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a / b;
  return a.operator$div$1(b);
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$._SharedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b) === true;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  !(target == null) && (target.builtin$typeInfo = typeInfo);
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31) return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$._FileWriterEventsImpl$ = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) return ex.dartException;
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    if ($.eqB(type, 'property_not_function') || ($.eqB(type, 'called_non_callable') || ($.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load')))) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NullPointerException$(null, $.CTC);
    }
    if ($.eqB(type, 'undefined_method')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NoSuchMethodException$('', name$, [], null);
    }
    if (typeof message === 'string') {
      if ($.endsWith(message, 'is null') === true || ($.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)) return $.NullPointerException$(null, $.CTC);
      if ($.endsWith(message, 'is not a function') === true) return $.NoSuchMethodException$('', '<unknown>', [], null);
    }
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true) return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    if (typeof message === 'string' && message === 'too much recursion') return $.StackOverflowException$();
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.ceil$0();
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null) $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.$call$1(obj);
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a - b) : $.sub$slow(a, b);
};

$._Lists_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 1:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.Arrays_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 1:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.buildDynamicMetadata$bailout = function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var inputTable = env0;
      break;
    case 2:
      inputTable = env0;
      result = env1;
      tagNames = env2;
      tag = env3;
      i = env4;
      tags = env5;
      set = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            for (var j = 0; $.ltB(j, $.get$length(tagNames)); ++j) {
              set.add$1($.index(tagNames, j));
            }
            $.add$1(result, $.MetaInfo$(tag, tags, set));
            ++i;
        }
      }
      return result;
  }
};

$.allMatchesInStringUnchecked$bailout = function(state, needle, haystack, length$, patternLength, result) {
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings) === true) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
      var t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.invokeClosure.$call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC21 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'c6');
$.CTC28 = new Isolate.$isolateProperties.EmptyQueueException();
$.CTC5 = new Isolate.$isolateProperties.ChessPieceType('Knight', 4);
$.CTC6 = new Isolate.$isolateProperties.ChessPieceType('Bishop', 3);
$.CTC19 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'a6');
$.CTC22 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'd6');
$.CTC12 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'b3');
$.CTC30 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC14 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'd3');
$.CTC17 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'g3');
$.CTC2 = new Isolate.$isolateProperties.ChessPieceColor('White', 0);
$.CTC9 = new Isolate.$isolateProperties.ChessPieceType('King', 0);
$.CTC10 = new Isolate.$isolateProperties.ChessPieceType('None', 6);
$.CTC8 = new Isolate.$isolateProperties.ChessPieceType('Queen', 1);
$.CTC23 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'e6');
$.CTC25 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'g6');
$.CTC27 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC15 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'e3');
$.CTC26 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'h6');
$.CTC29 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC3 = new Isolate.$isolateProperties.ChessPieceType('Pawn', 5);
$.CTC7 = new Isolate.$isolateProperties.ChessPieceType('Rook', 2);
$.CTC31 = new Isolate.$isolateProperties.Object();
$.CTC18 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'h3');
$.CTC24 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'f6');
$.CTC11 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'a3');
$.CTC20 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'b6');
$.CTC13 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'c3');
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC, null);
$.CTC16 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'f3');
$.CTC1 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC4 = new Isolate.$isolateProperties.ChessPieceColor('Black', 1);
$.PieceData_wk = 'data:image/png;base64,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';
$.PieceData_wr = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOOAAADjgBT3J5yAAAAAd0SU1FB9kCGQo5AzQu9eQAAANbSURBVGje7Zm7axtZFIc/GSkP5Fe0MFOoGoiE3Kj0gnfBYCWKWJSknF5/gVyYdMa4deFKarbaJsV2YSGEhahRYyZgmMqCDXKRFZFJQJYt4gkyuWnuwDiRrNGMRlZ25wcXoZlz7j3fuY85GkGoH0u/Al1ADGkHwJLD/gnw+Rp7Ie8/cfgkgDfX2HdlHJ6VA3ojghLA79L+ngsIJ8w96fenC/uejGeo5q659wcQdwG8ID9vA7dcJumWtAdYdGEfl/F4UtvOSLVaFaenp1daKpWys/UeeAXUbHtd18XBwcF3Tdd1Z5Zr0u8DIFKp1HdjVKtVp33bF0g2mxWDlMlkhi6Fcrk80KdcLg/1yWQyA32y2awrkLlRNHNzg010XR+8BuJxisXiwHvFYpF4PD5Wf8PG/1ZRr9O1s7NDPp/n/Pz8ynVN00in04NPj1yOw8NDjo+Pr26yhQXW1tZ8Ha9RP85eBk+n00NB/WjkvLXbbVqt1o08xFqtFu1223c/z4AvgFBVVdTrdTFN1et1oaqqvdG/yHg8SwcsQMRiMVGpVKYCUalURCwWsyEsGYdv/QJ8tI/JUqkkLMsKBMCyLFEqlZzH8kc5/khFXMLcB14CKYDV1VU2NzeJRCIT2w9CCPb39zEMw770D/Ab8HbSe+8noO6ylvLb6nK8wHQbeB4wxHNHHeZaXtbGMtAB2NjYYHt723d2dnd3qdVqOKro06k+EBVFYX193TeIoijBPxB/FIUgIUgIEoKEICFICPJfAvFVa3U6HUzT9B1Ep9O5EfjlgMv45WktrZ8DTpSn/sf9PZID/gLuLi4usre3x9LSku/Iu90uW1tbnJ2dAVwAj4HXQWUqB3wCRCKREIZhTPTFg2EYIpFI2MvrEyP+RvCqBzaEoijCNM1A3qKYpikURXHCPJgkxEMbIplMikajEeg7rUajIZLJpBPm4SQg8nLNCk3TRLPZnMoLumazKTRNs2EuZByeN3seeAHcAVhZWUFV1amd8ScnJxwdHdlfLeAp8Pe4/TyyZ2KG2oWMa6wZuQDuRKNR5ufnb7z86PV6XF5e2jNzdxxfAYhCoSBmQYVCwTkz/+Oisd/v0+12bzzIfr/vuUQRM5z8yDhL698ZhRg7rvvAuxk7ft/JuEKFmqa+Ah2gRTqtH9sFAAAAAElFTkSuQmCC';
$.PieceData_bb = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOOAAADjgBT3J5yAAAAAd0SU1FB9kCGQsGDP2NqH4AAAQ1SURBVGje3ZrBbxtFFMZ/sWPXVuWAXANOOCDMHigp6QKRIEKCQ4AakBBCVooULoUDJyqEQCAkDnCoBEgof0IEyoHmkIQLBQFai7oJilB7oKUqLiQltVxZuMEO9SZyPRw862xDbO/a3o3Nk568sscz88178703bxack+eA00Ae+BM4CbwJBOgRCQPfAKKOngT6egHI6+aJ+/1+4ff7d4L5oBeAnDImnEgkRLFYFOvr62JiYsIM5GwvAMkaE15aWhKGLCwsmIFc6/SgHgeAXDAe5ufna1+mUilzm196wSLvmPfD6OioGBkZ2blH3uoFIH7g1wasdQHwdbtreYCngX8atFkH7u9mSzwJXG5gCbPeBL4A7u0mAB4ZF8oWQZh1C/gY6N9rEHcB37UAYKd+DxzYKxD32HAlK/o7cNBtEDFgtdnkQqGQUFVVqKoqQqGQFTArwJ1ugdgHnLOyyvF4vBbZ4/G4VcuclmM4Tr8ngMMOLtTjwPtOA4kCx5s1UhQFVVWJxWLbvhiLoaoqiqJYGec4MOCkW71rxT00TRP1RNM0qy72tpMWibtIKE/YaWw3EN1npdH09DSapqEoCpOTkwDMzMyQTqdZWVmxOtYDTq7SdTuxoUXWMvS6k66VctG1Uk66lgY8b7VxPp8nmUzWnm3KD06u0iMdTEma6UNOZ7rXXACRcegYfou87AKQF+xOqtVC2RzwovmL8fFxEokEkUiEcDiM1+vd9Y/lcplsNksmk2F2dpbl5eX/sDdwzC1GiQJ/GSvo8/lEPp8XdiWTyQiv12u2xGqrqUk7pctX5HG1WicNhxkbG2NgYIBAIEAwGCQYDBIIVEu9uq5TKpXQdR1d19nY2GBxcZFcLmd0IYCnnGarerLUwX1xrp2JtHtWjtRqQH4/iqIwNDRENBqlv7+/6R5Jp9NsbW0ZPw1LtyrsxVFXAMLj8TTMeOtJMpkUHo+nLbbqhEVeMh4qlQpTU1PkcjmGh4cZHBykr297+21ublIoFCgWi7XPtbU15ubmqFQqt5Af8JXbFvnRgfhx3m0QYVlkcyIYRtwuymUdAJF1IzXZKYck55c6AKAk+zq0l9XGfcAzwJkWAJwBjrRS/rET2X2AIj+LUgty0CGpCvCsBLK/xTnckGXXr4FLwFWZ/W7KuBKS+rdMYWyt8AnZkegyvQh8ZqUaOSgpUHS5ngVua+Rmp3oAhKFJ6rx88EYPgTD0092A/OzQYJ8Dsw71vWvG/DDVG6RODfKHpFZDXpVs1Kn+bwKP1dsn77XZ+Q1Zj/qoDh37gKPAt1RftmlnrE8axZE+yedHmrBbGbhC9ZbpsnTLZaovApRtUP3dMpo/aNKDNH+D6KIsF+mNAuIdwE9s37heAeaB30y6Kk3rVB53gOr95GFgFBgDHpW/n5dHiEtWOrsd+BJ4jS64cZXyoawR7Of/LP8CuosaQN0AbCQAAAAASUVORK5CYII=';
$.PieceData_bn = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOOAAADjgBT3J5yAAAAAd0SU1FB9kCGQsGJiY2YagAAATmSURBVGje7ZldTGNFFMf/tHxEWKABQrAEYpTYZKUskZiQDRg+TDQgKw00vvuyQQXDg6IEX9REIfHjbRejJBYSE6GoQRR9QVwhMTRA4hqBBSmEYiSklO6yLf06vtyOt+NtaXvvpX3Yk5zk9p7TM/ObmTtzZgZ4IOklWpXiPgPgGwAEwJZu0G8AuAtgGcAXAAYAPCrhdxVAQIAgAF+r2GBJyXVR5cIaBDAFoF7w0QGwS/h9kE4gJokKivUWgB+i2EIAKtIF5Oo5IOfpm+kCclkmyG01K5eZgG+OzLKeALAA4BKAOwD+BLAGYFaYHC5MrsnskWhqB/AKgIcuCmRWJZCw/g2gSW2IKmHmSaqS+fn5ZDKZqKGhgQoKCmL5+gG8qibIR3Ja22KxkFi2t7epv7+fcnJyov3nMwAapSHyALjkgFRXV9Po6Citr69HANntduro6Ij2v08uYkUnjUZDOp0uYaiWlhZaXFxkMKFQiAYHB6P5v6wkyG1x8IqKCpqamiKn00lERDabjbKyshIG6uvro2AwyIAmJiak4gQAPKsERLM4sNFopP39/YjhsbS0RBkZGUkNObPZTF6vl8WyWCxSsVwA9HJBrOKg8/PzERDBYJDq6upkTbtNTU3kcrlYzOHhYSm/r+RAVIrT8fLycgqFQqzA4+NjamtrU2QNMRqN5HA4WOze3l4pv+eSBXlfHKiwsJA8Hg+dnp7SzMwMVVVVKbogVlZW0uHhIRER+Xw+qqmp4X22k1n98wA4+cKKiopizf2y1WQysV6x2Wyk1Wp5n/cSBelVOR2JquPj4wxmYGCAt58BKEtkH/9XqkB0Oh2bGT0eDxkMBt7n9XhBzKmCCGtnZyfrlenpad7+R7wgv6UaRKPR0M7ODhER+f1+0uv1vM9T5x0HNQIYSvVWlIiQl5eH1tZWaDQauN1uLCwsiF38AL6PFePbVPdGWMvKysjv9xMR0d7eHj+DOWPtWA1y9hxqqNVqZd+KRJYckYOJc/6XAGSk0/mTxWJhz11dXby5Ltr/thRszTMAHwK4KSdOaWkp65GNjQ3ebpWCqA07GAwGMpvNciCsAB4T4v4st1HsdjuDKS4u5g8t/ifvAqDGxkYKBALkcDiSKfQfAE9zSeeZXJDJyUkG0t7ezttL+G+kCwBGRkag1WoxNjaW6HB2C9npL6J3gwCy5X4ny8vL7Lm+vp43P8m/+BEADQ0NUU9PD2VnZyfSave5ngCAx5XoDQDU3NzMemRubo63v8WDXOGuAuJVP4DnuVhZwp2IIhOHXq9nIGtra7z9plQvvihULJGC3jlvHyNXc3NzGcju7i5v/zLakHxBOPGLp5ANidW1WbgzUXRh9Pl8RETkdrt522ys7ysLQDeAn4QeCgC4AWCFC8Ifbz6cQCMkpOGdIxFRZmam2PZrvJPGJQCPiKdoQT+X8P1OrVRlc3OTgZSUlIhtv8d7rXBP0PDY3xf2zTc4vzYA7WqlKi6Xiz3rdDocHR2FfxYmcz9yH8CoxPtsAB+rmXOdnJz8d6GTGVHlAqmkMVl5TVg3VBOn0xlr6CsCUgbgbbWz4K2tLfbs9XrFJq9SINcA5KsNsrq6CgA4ODiA3R6RK95VqoxPL2qT1d3dTbW1tfz7O0qBrKR4F7mixNDKAVCd4k3kPSVArghZQFqAPJB0k38BGx/TXl5+rMMAAAAASUVORK5CYII=';
$._getTypeNameOf = null;
$.PieceData_wb = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOOAAADjgBT3J5yAAAAAd0SU1FB9kCGQo4Ed6Mte0AAAduSURBVGje3ZpbTFTbGcd/MxxujlwcbhoExDJMih6dkrZGeqzamBQscbAlVRIak3NqPQ8kNvFBm/BCj2mMxgdtUmJpfSAm9hgTMEbRphiJjRyaWJq2kTiFcJGqwEaZQQaYYfj6wNqTDQyXQQcP/ScrzNp7rb2+/17fbX0biBx+DPwNeAP0AX8CqoCPWCNIBf4MyALtylohUqULHRMTI/v27ZPi4mIxmUxGMp+vBSLNgJhMJmlsbBQd9+/fNxJpXgtE3gCSn58vc5GXl6cTca0FIo8AiY6Oljdv3gRJvHz5UhITE3Uit9YCkV/pKuRwOOT27dty7do12bVrl1G1frkWiMQq1VnIaz0DYt73oub3/DwTsFfZyWI29H019muJA0Cn8e1bLBY5cuSI7N+/X6KiokLtzA++TgQ+An4DBHQhd+/eLdevX5exsbGgsQ8ODsqVK1dk27ZtRjIB4Asg6kOTyAYeG3fg0qVLEggEZCFMTk5KTU2NxMTEGAk9AjZ/KBJ24L+6MAcOHJDu7m5ZLp4+fSpFRUVGMv3qmauKbcArXYjjx4/L9PT0PGFHRkaktbVVWltbZWRkZN79qakpOXr0qJHMK/XsVcE6o3s9duxYSBIiIk1NTUEhm5qaQo6ZmpqS8vJyIxmXWiPiqNUXraioWNQelkNERMTv90tZWZmRzG8jTSJH906FhYXi9/tDCtbf3y8dHR1SV1cXFK6urk46Ojqkv78/5Byfzyfbt2/Xx08BWZEk8oUuWG1t7YJv2Ol0LhTVxel0Ljjv8uXLxrG/jmRkLwGIi4ujoqLivb+lyspKYmNj9e7BcINZONgC4HQ6SUpKWnBQcXExGzdu5Pnz59y9e3dGqoMHycrKwuFwLDhvw4YNOJ1Obty4EVwrEjDp9nH48OFlxYrlGrsRBqMfDycfC0e1BHgO0NbWFjEjfPz4sf6zVa0ZEdX6N5Dz4sUL+vr6yM7OXnRwRkYGTqcz+HspdHV1MTg4qHcfRNJr/UxXlaqqKnnfOHnypNFrfS+SRCzAMCBRUVHS3Nz8XghMTU1JQ0ODmM1mY6oSHa4Bh4ufADf1zo4dOygpKaGkpIT8/HzWr1+PxWLBbJ5vfiLC27dvcbvduN1u+vr6uHXrFg0NDUaVAvgRcHc10pQ/LnKUFUDWrVsn6enpsnXrVsnJyZHk5GTjG1+s/W6lLnUlWA+0A3kAeXl5mEwmPB4PHo+H8fHxRSfHx8eTlJREYmIifr+f7u5u/ZYL+BbgXc1U/ruAH5Dz58/Py5s0TZOuri5pb2+X9vZ26erqEk3TxOfzzRpbU1Oj74Qf+PaHOlz9K5wAuUQAfKei3btUxtP0Q9DOnTuDFwOBAJqmoWkaQ0NDDA0NzQxOSyMtLY3U1FRSU1OJipo5pjscDhobGwFswCbg5WrvxhHdQG02m9jtdrFarXOL1SGbyWQSq9UqdrtdbDab8d6KM9F3qS39Afhs7sXo6GisVispKSlYrVasVitxcXGMjo4GnYDH4+HZs2eMjY2F8oY/X+0d6UF9Orh69ar09PSIx+NZtm1MT09Lb2+v1NbWGisqPatNYrOuDoWFhTI+Pr5iY3/y5ImxSi8rLQutVLWiVPlmI0B2djYOh4Pc3FwyMjLw+XyzBvt8Prxeb7CNjY3h9Xrp7u7G5ZrlrF4pIoHV3JV84I4KXvKOzauelf8hq43xQCnw1VwBU1JSpL6+Xs6dOydWqzUUga/U3PhICmhSx0278u/r1bUYdf0T5WG+1DNiYysvL5eBgYFZxbozZ85IbGzsXDIaM198P1Op+xa1hkmtuUnJsCVcU0gGLgCjId5gAJheTE0KCgrk5s2bQQJut1tGR0eD/c7OTjl06NBSqjZtLIob2qiSLXk5H2nawtFvs9ksOTk5UlFRIS0tLbM8ktfrlT179kh5efk8b9XS0iKnT5+WoqKiuQXt5bQ2JeuCXuv3wHG9ExcXx969e0lJSSE5OZmkpKTg38zMTPLy8sjNzTWWcIKYnJykrKyMe/fuAXDixAkuXLhAQkLCvLETExO4XC40TWN4eJjXr18zPDwcbAMDAzx8+JCJiQnjtDrgF6F241Mj68rKStE0Ley40NfXJ9XV1bJp06Z5bzIzM1Pq6+tnfTdZLjRNk8rKyrnP/DTUjrSp1HwmbPf0kJOTs6geut1uenp6gu3BgwfcuXOHQCBgrLzUqaJ0ZfC8bLFQWlpKaWkpBQUF2O12LBbLksbb29vLli2zyl1P9NTfSORjZv53JA7g7NmznDp1ioGBAVwuFy6Xi87OzlmCj4yMLLZuh9r6v6r+UeAs8I157tFkYvPmzdjtdux2OwkJCZjNZrKysrDZbNhsNtLT07l48SLV1dXBRBsoUjLPw+dzs9QwjfAt8BfgFKG/3JqAHwLXgf8s5QGXkOX8UinKl8BPl+GmNZXkdSm1fAT8Q1XSl4sEYAewE3Covx8vI0A+U+MnFiOSqCLuN9X2NQP/VEIb21iEArEZSAcylAzfUbb7ibr/d8Cpcr0lkahKPhEtkoWJKpUBxPP/jP8BuRYrZeMl254AAAAASUVORK5CYII=';
$.PieceData_wp = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAANywAADcsB0EsExQAAAAd0SU1FB9kCGAkFEQ6eJG8AAAQpSURBVGje7ZpNSGNXFMf/SWOexsSPzgiCiERbLKRis5ghMKOg1RERdVOVuiuU0hZ3baELKTgMBFy5sLQLyVIURouhKtJRVzLjZDGioxUU6WgsNTb4UVLTMc3pYt4NJyFIzNy89yjzh0DO43Le/b1z7r3n3veANzKWTDny2wHgQwAeAC4A2wCeAHgM4CGAmNEfjAXA9wDoip8fQL6RIYoAPOKddrlc1N/fT263OxVmEUChUUE+Ex0tKCiglZUV4vL5fGSz2TjMN0YFeSg6OTY2Runk9Xo5yLIRId4CcCI6GQqF0oJsbm5ykJdqOkqRWZIfAmATRiAQSNtob2+Pm3kyZ01ZIHEAL4Th8/nSNpqenubm7wDOjJheP4i0ycvLo7Ozs6S0ikajVFJSwlPrR6MOdhefYmdmZpJApqamOMS/AN6ReXOzRD+3AUTFhcPDw6QG6+vr3Iyo7U1GisT7AJ7xaPT19VEkEkmKyMnJCXV1daUujE8BvGcEiDoAIdExs9lMo6OjdJWGh4fJZDJxmD/UtNRNCoCg6JDVaqWJiQnKRJOTk6QoCofZV/3pos95mszOztJ1tLS0lJpmX+gF8lh0oqamhrJRbW0tB3mi16yVmD47OjqyctDe3s7NGj1ArABuCqOlpSUrJ62trdy8qfrVFOQlgD+FsbOzk12BRsTN31S/mqfWr+LP/Px8Vg7W1ta4+VSvwf6lGKiKotDq6uq1BnooFKLi4mI+2L/SC8SqVrwEgOx2Oy0uLmYEsb29TXV1dRziEECFnoviJ3wtUBSF5ubmroQYHx8nu93OIc4B1BuhTOkCcCA6VlhYSIFAIC3EyMhI6iJ4CqDVKNWvH8BHAP4BgEgkgoWFhbQNd3d3ufmXevb1ixGiYQXwnQpBAKiqqopOT0/TRmR/f5/Kysp4RKIAHvBtsh7yAHjOU6Wzs5PC4fCVYyQYDFJDQ0Nqir0AcEsPiPvqLi9Rvnu9XorH4xnNWrFYjAYHB8lsNnOYCwAfawnxLX+aDoeD/H5/VkXj8vIyVVRUpEbnay0gPuU3dTqdtLGxQa+jcDhM3d3dHCSuzoQ507sALsUNGxsb6fj4mGQoHo9TT09P6tqSsy1w4ki0vr6eotEoydTFxQV5PB4OM5+rGYoAkM1mo62tLcqFDg4OUrfAd2WD/CScDw0NUS41MDDAQX6WCWFRjzZJURQ6OjrKKUgwGORR+VvmocQd8YR6e3tJC7W1tfGoNMuqte4lzkRd2hw/NTU1Je2IZYEkSuzq6mpNQJqbk4LwgSyQxCGD0+nUBMTtdsNkShwLvy0dRKuIWCwWOBwOYd6QCpKfn4/y8nLNCrrS0tJrRcSSiU8AqKysxPn5uWYgRUWJ14vFmbTP5P3EZYbAuVIMr943vnZqXeq8C72UNUb0/m7E8N+tvNH/Wv8BwzMALd0F56YAAAAASUVORK5CYII=';
$.PieceData_bp = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOOAAADjgBT3J5yAAAAAd0SU1FB9kCGQsHEYeQ9eYAAAHeSURBVGje7dnPK8NxHMfxpx/blB81CzlROK6cjVykieRGuYkc5Kjc1A5u+A84+AMcXKS4OeygpShL2Y1yW9TsB3Owb0nh+/3u/d3nvdmnXrfvZ/s+9vn9GdSLrtLg0ef2A9NABBgBfEC8lBPgqhp+nCiQBoo/5BWY1Y5YBwq/IKzkgXmtiD4bgK/JAR1SX94oCJly+LwPmKwFCKUJQR0k5KJOt0bIrYs6SY2QMxd1LjTOWs1AysGsdQ80aWyRAHDt4PkboEVbaywBDw7XkWKpzooWxK4LwPfsmUbEBBBWNk0heoGMIOQFCJoY7GvCg7UVWDUBGfaglSMmIIMeQIZMQAoeQNImICkPIJcmIHFNkHJKO/AkOP1mgAGTZ3QpyKLJld0HHAogtrXstyaAOxeAR2AZgfs1qW18qLQyu9n6B4SPE64XsFOBrpUoZ1UvtyW3+Lw1lBrsb8BGpRH7goDvOQD81Y6wcuz1uNmpAMJKzCtEGHsX1FJ5B2a8gJxXEGElKd3F5gwgrCxIQo4MQhJSCD/wbBBSBHoktijjQJvhHcSoBCSqYFM6JgEZUAAJS0C6FEA6awUS/DcQOyezNwUHn3f++FPIzgvmFbRIXqJrZRVAshKQnAKIhneoF0flA0CU3JLw+cFsAAAAAElFTkSuQmCC';
$.PieceData_br = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOOAAADjgBT3J5yAAAAAd0SU1FB9kCGQsHAO0g1RQAAAHaSURBVGje7Zq/T8JAGIYfFDVxIv4BTQeDxBkTw+IMq4M1Lg7GyMAfwsBuXEgMiQmJYSHMnZhZxYWgAyOTC78cvCaF8KPtXSnIvcmX0PS73vtc6dfjDtDaPhWByZzoAmczuTfAYEG+EwOR59Y50FuQX1QBUVphqu3KNYDhinwnhiLf0eeK/JIMRNqDoZ4rP+URwomUq23PQ356mdl4wHOOTgBbfD72OVCvwI/rOqsUR9LsMh0AVwHbXqh8kPf+S0XSIBokAh0BdZ8lNayoCz+BdQjUIoaoCR/SigPViCCqCl4RU9oHKmuGqIh+QykM5TVBlP0WophPmBjwDDwCGIZBJpORHqFms0m323UOX4AnARSqTGfkLMuaqJBlWe67Ye70e0SqIti2TTablTbRarUigTdDftB3+6ulQTSIBtEgGkSDRDZFSSaT5HI5aRONRoN2ux3dFGXbZ7+XIQ9UoOv7/WF1Dbzxt1RKIpHANE1p551Oh36/7xwOgFvgPayR8rL3oSrm7aEo0R3e9z5UxVD0q0z3wCii5aCR6F9aD8A44gW6sfARWPkNgHDD5INAFDYEYDYKfstv6GtKEorpSaMG0SDqQL431O+X3wanotEmld4Ppv/2oaW1Dv0Cw42jSTIHjOcAAAAASUVORK5CYII=';
$.PieceData_bk = 'data:image/png;base64,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';
$._cachedBrowserPrefix = null;
$.PieceData_wn = 'data:image/png;base64,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';
$.PieceData_wq = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOOAAADjgBT3J5yAAAAAd0SU1FB9kCGAkPCwkTNZ8AAAlASURBVGje7Zl/UFzVFcc/u7A/wCy7/Ay2BAIEqhlj0xoLnVR27IgNqTViojadMv2B9seUzCTTpDGYSZxUGZxpp02Tav5ItXUcTad0cP8gamJQRp3Gwei2ISYubsQGZAfIsoVuCBA5/aPvPt++vMVFQTtTz8ydd9+533vvOfede+6558Fn9P9DVwD7gbNAH3AQqPhfE7IQ8MzSvhh4HRBTOaUpmIxyAe8noUA1ENaEmgZeBq61wG0HZNWqVfLaa69JMBiU6upqpcwvLfAVQDcwA1wCjgNfXSglvgFctFjlPqDAhD0KyMMPPyyKDhw4oPAvmrBXAcMW4w4BpakKZ5+DIj8CXFVVVTz//PMEAgFKS0sBSoAtJmwM4PTp0zojFAqp6qAJ+10gb+nSpRw7doxnnnmGqqoqgHxg10J8kRFADh06pK/y/fffr1bvFRP2e4A4nU6pr6+XO+64Q9xut8LeacK+DMijjz6qj3vo0CGFfTtV4dJNX2ct8HVgVDOP44b2KJAbiUR0xuCgvrj/No3bAcxMTU3Z29vbzXP+zfR+AeCdd96xGve8CfsV4JtABvACcAyYMiv0pIWd/sKAeQiQ3Nxc2bJli9xzzz2SmZmpcPssFukVi/GGLXC/B8ThcMi2bdukqalJcnNzFf5eA26z5gyM4/3VvD32AOJyueTWW28Vv9+vgO8DNQZln7MQTiz2CMAjFrjnLHA/TzJmp0HIOsWvra2Vuro6cTgcCrfHONgJQPbv36/baV1dnQLuNR1yJy0m/bWFgDstcC0WuF9b4KaBqw2Y3wLS0NCgy/fAAw8o7Emj1/ocwNVXf9C3srJSVcsNA8aB31kI8yUL3pAFr8eCt9KCtx84bXhfBrBixQqdYZA1z9jxICAbNmyQSCQiJ0+elNLSUqXxI6ZJsi1W8HyKJnO3Be68Be6LVma6fPlyCYVC0t/fL2vWrFHYg0ZgrdpIdrvdPOh2i8kvAEaXKkCxCfOQhYD3mTBLVJvBcQiwyCpSAMRmsxllnNFk103rKPAtIDozM4PFZGaKAtTW1hp515kwBQDZ2dksW7bMGIMZ6cuqsn79eqNJmt25vkgigiZjVJP5qPlk79Bs3XzyrreIAGIAhYWF1NQop8Z3rBRZtWoVN954YzJFNgL4/X7KysoUr8+ESdNkMNI5TdaOZCHKP4EzFpHu10w8N8DixYu5+27d7NeZBC0HuP766/H7/foeNSlaD7Bp0ybS09ONghvJb7EAL2iyzhprBS14PzO9ewGKi4vZsGEDPp8PwAH8UGtfpO4eFopkaPUfAM4lS5Zw2223UVJSkjC26SA00+uphC3fVhvL6/UaN6BRmSlAnn32WRERaWpqUpizgA1Yrfr19/eLiEh5ebnCVGmYMCAtLS0iItLV1WWMehXtSCJLTSqKlKkOu3fvlvz8fNV5ShMwQ7W/+eabIiISDofF5XIp3M1AEyAVFRX6AdbY2Kjaf6p5GnG73TI8PCwiIn19fap90nBteB+Q/Px82bNnj9FTZaUSxp/VIl3ee+89AoEAbrdbmU6bdn9AmRZAWVkZ27ZtU+wfqwOysbHxA0P/wLyuA34CsHHjRvLy/nueFRUVkZaWBuAElmuxn93lctHe3s7IyIjqHwbGUo2KO9QBJCLy1FNPic1mUysSBiQnJ0eMFI/Hpbi4WIUXfenp6RKJRPT2gYEBNUYfMF1QUKCbnSKtvxhuofLEE0+IiEhVVZVq+/Nc7h671eETjUZFROTBBx9MONxWrlwpZgoEArrCt99++2XtDQ0NAkhaWpp0dnZe1n7DDTckzLFr1y4REZmcnDSa7r1zUUSPNjs6OvSJHn/8ccnIyBBA1q1bJ1bU0tIiDodDTp06dVnbuXPnJDMzU1pbWy37KkWdTqccOHBA57/66qtGBW+eiyK5qmNzc3PCZMFgUMrLy2XTpk2SjDo7O+XSpUsyMDAgJ06ckO7ubunv75fp6Wk5evRo0n47d+6UoqIiOX78eAJ/3759RkXyrQS2zaLM20C53+/nxRcT8wWxWIyenh6Ki4s5cuQIZ8+eJRKJMDg4yODgIJFIhOHhYczhjs1mIy8vj8LCQq688kr9WVJSwk033UQ0GqWsrIz8/ERZ6+vrefrppwH6k4RMs9KTgGRkZMjQ0JC+Om+99ZZs375drrnmGklyIfrIpaKiQjZv3izBYFCfr6enxxgkBpIJO9sX2Qz8BuCuu+5i69attLa20t7eftlKp6WlsWLFCiorK/F6vXi9XrKysvS63W4nHo8Tj8cZHBykt7eX3t5ewuEwU1NTlpOvXbuWHTt2sHfvXtra2hT7viSXs1kVWa5lBi2pqqqKNWvWsHr1aqqrq/F4PHNOy8zMzPDuu+/S29tLKBSira2Nrq6u2bp8AQh9lBRQl5UJHDx4UBaKDh8+nMz0/pJqOsiK7tRSQksVIyMjA4fDQXd3N+Pj44yNjTE2NpZQVyUej+tmaLfbcbvdZGZm4vF4dLMzl1gshs/nIxaLGeU4qQWZH4uu0i4x8imVIeNCfpTNbr4THNHioA8lp9OJz+fD5/ORnZ2NzWZjdHSUWCxGLBZjcnIy1UWc0hKGr8yXImiB3iMALpeL1tZW8vLyyM7OThDa5/ORmZk560ATExPEYrEE5UZHRxkdHaW5uZnx8XEF/T7wp/nO/Tq0K6YA8thjj837Rm9vb/+wZN68ZOOnjcm6N954Y96z5D09CWmvPy6UIhjvyTabbd4V0e4jiv41l77pc5yrQVVycnIIBAKcP3+eaDQ661NEyM3NJScnZ9andoEz/o85vBD/R7I18/qk3O4l4PML8UVqrfBer5eKigoWLVqkF4/Hk/But9u5cOHCZWVsbIxQKEQ4HMYiMZgGNJqz7fNBfzCu2NatW+XMmTMyMzPzsb3VxMSEBINBaW5uNn+Vvy+EafWrCXJycmR8fHze3e/FixelqKjIqMhEqg4pVdfjVWlSPc+/bBm33HILNTU1FBQU4PF48Hg8ZGVl4fF4cDqtg4Dp6Wk9NlNlZGSEl156iY6OjoQfqBplAePzpUi6lkotT/XzOZ1OXTmbzaYLPYfwBOAf2v8TmU/TWgL8SjtLFtpjDWj/JZemKpztY7jia7VSqb2r4tOeV2hhjVOzc9HMc0j7KZrsGdH+Vgmf0Wf06dN/AN7h/NfE93vdAAAAAElFTkSuQmCC';
$.PieceData_bq = 'data:image/png;base64,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';
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$JavaScriptIndexingBehavior', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$List', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('AbstractWorker', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["width=", "height="], {
});

$.$defineNativeClass('Attr', ["value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$(this);
 }
});

$.$defineNativeClass('AudioParam', ["value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._BatteryManagerEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLButtonElement', ["value="], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 set$width: function(value) {
  this.setProperty$3('width', value, '');
 },
 get$width: function() {
  return this.getPropertyValue$1('width');
 },
 set$src: function(value) {
  this.setProperty$3('src', value, '');
 },
 get$highlight: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'highlight');
 },
 highlight$2: function(arg0, arg1) { return this.get$highlight().$call$2(arg0, arg1); },
 set$height: function(value) {
  this.setProperty$3('height', value, '');
 },
 get$height: function() {
  return this.getPropertyValue$1('height');
 },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
 },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["width=", "height="], {
 getContext$1: function(contextId) {
  return this.getContext(contextId);
 }
});

$.$defineNativeClass('CanvasRenderingContext2D', ["fillStyle!"], {
 fillRect$4: function(x, y, width, height) {
  return this.fillRect(x,y,width,height);
 },
 drawImage$9: function(canvas_OR_image_OR_video, sx_OR_x, sy_OR_y, sw_OR_width, height_OR_sh, dx, dy, dw, dh) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y,sw_OR_width,height_OR_sh,dx,dy,dw,dh);
 },
 drawImage$5: function(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y,sw_OR_width,height_OR_sh) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y,sw_OR_width,height_OR_sh);
}
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRect', ["width?", "height?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.$defineNativeClass('DOMApplicationCache', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$(this);
 }
});

$.$defineNativeClass('DeprecatedPeerConnection', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLDocument', [], {
 query$1: function(selectors) {
  if ($.CTC27.hasMatch$1(selectors) === true) return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 $dom_createElement$1: function(tagName) {
  return this.createElement(tagName);
 },
 get$on: function() {
  return $._DocumentEventsImpl$(this);
 }
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$(this);
 },
 get$parent: function() {
  return;
 },
 get$id: function() {
  return '';
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 }
});

$.$defineNativeClass('DynamicsCompressorNode', ["ratio?"], {
});

$.$defineNativeClass('Element', ["id?"], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 }
});

$.$defineNativeClass('HTMLEmbedElement', ["width=", "src!", "height="], {
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', [], {
 remove$0: function() {
  return this.remove();
 }
});

$.$defineNativeClass('EventException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
 }
});

$.$defineNativeClass('EventTarget', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._EventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', [], {
 get$elements: function() {
  return this.lib$_FieldSetElementImpl$elements;
 },
 set$elements: function(x) {
  this.lib$_FieldSetElementImpl$elements = x;
 }
});

$.$defineNativeClass('FileException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'File'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
 }
});

$.$defineNativeClass('FileWriter', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileWriterEventsImpl$(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('HTMLFrameElement', ["width?", "src!", "height?"], {
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLHRElement', ["width="], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('IDBCursor', ["key?"], {
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBDatabaseEventsImpl$(this);
 }
});

$.$defineNativeClass('IDBDatabaseException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBObjectStore', [], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._IDBRequestEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('IDBTransaction', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBTransactionEventsImpl$(this);
 }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLIFrameElement', ["width=", "src!", "height="], {
});

$.$defineNativeClass('ImageData', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLImageElement', ["width=", "src!", "height="], {
});

$.$defineNativeClass('HTMLInputElement', ["width=", "value=", "src!", "pattern?", "height="], {
 get$on: function() {
  return $._InputElementEventsImpl$(this);
 }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLLIElement', ["value="], {
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMarqueeElement', ["width=", "height="], {
});

$.$defineNativeClass('MediaController', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', ["src!"], {
 load$0: function() {
  return this.load();
 },
 get$load: function() { return new $.BoundClosure0(this, 'load$0'); },
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  return $._MediaStreamEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 add$1: function(track) {
  return this.add(track);
 },
 get$on: function() {
  return $._MediaStreamTrackListEventsImpl$(this);
 }
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
});

$.$defineNativeClass('MouseEvent', ["offsetY?", "offsetX?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 remove$0: function() {
  !(this.get$parent() == null) && this.get$parent().$dom_removeChild$1(this);
  return this;
 }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._parent.$dom_removeChild$1(result);
  return result;
 },
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._NotificationEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLObjectElement', ["width=", "height="], {
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
});

$.$defineNativeClass('HTMLOutputElement', ["value="], {
});

$.$defineNativeClass('HTMLParamElement', ["value="], {
});

$.$defineNativeClass('PeerConnection00', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLPreElement', ["width="], {
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function() {
  return this.id;;
 }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFECompositeElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEDropShadowElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEFloodElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEImageElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEMergeElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEMorphologyElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEOffsetElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFETileElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFETurbulenceElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFilterElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGForeignObjectElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGImageElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGMaskElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPatternElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGRect', ["width=", "height="], {
});

$.$defineNativeClass('SVGRectElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGSVGElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', ["width?", "height?"], {
});

$.$defineNativeClass('Screen', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLScriptElement', ["src!"], {
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "length="], {
});

$.$defineNativeClass('ShadowRoot', [], {
 get$innerHTML: function() {
  return this.lib$_ShadowRootImpl$innerHTML;
 },
 set$innerHTML: function(x) {
  this.lib$_ShadowRootImpl$innerHTML = x;
 }
});

$.$defineNativeClass('SharedWorkerContext', [], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLSourceElement', ["src!"], {
});

$.$defineNativeClass('SpeechGrammar', ["src!"], {
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
 }
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
 },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null) return;
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'StyleSheet'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["width=", "height="], {
});

$.$defineNativeClass('HTMLTableColElement', ["width="], {
});

$.$defineNativeClass('HTMLTableElement', ["width="], {
});

$.$defineNativeClass('HTMLTextAreaElement', ["value="], {
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackEventsImpl$(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text!", "id?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
 }
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackListEventsImpl$(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Touch'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', ["src!"], {
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["width=", "height="], {
});

$.$defineNativeClass('WebSocket', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMWindow', ["navigator?", "length?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WindowEventsImpl$(this);
 },
 _ensureRequestAnimationFrame$0: function() {
     if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   var vendors = ['ms', 'moz', 'webkit', 'o'];
   for (var i = 0; i < vendors.length && !this.requestAnimationFrame; ++i) {
     this.requestAnimationFrame = this[vendors[i] + 'RequestAnimationFrame'];
     this.cancelAnimationFrame =
         this[vendors[i]+'CancelAnimationFrame'] ||
         this[vendors[i]+'CancelRequestAnimationFrame'];
   }
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   this.requestAnimationFrame = function(callback) {
       return window.setTimeout(callback, 16 /* 16ms ~= 60fps */);
   };
   this.cancelAnimationFrame = function(id) { clearTimeout(id); }
;
 },
 _requestAnimationFrame$1: function(callback) {
  return this.requestAnimationFrame($.convertDartClosureToJS(callback, 1));
 },
 requestAnimationFrame$1: function(callback) {
  this._ensureRequestAnimationFrame$0();
  return this._requestAnimationFrame$1(callback);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._WorkerEventsImpl$(this);
 }
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequest', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('XMLHttpRequestException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$(this);
 }
});

$.$defineNativeClass('XPathException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
  return this.postMessage(msg);;
 },
 get$id: function() {
  return this.id;;
 }
});

// 191 dynamic classes.
// 303 classes
// 27 !leaf
(function(){
  var v0/*class(_SVGElementImpl)*/ = 'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement';
  var v1/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v2/*class(_ElementImpl)*/ = [v0/*class(_SVGElementImpl)*/,v1/*class(_MediaElementImpl)*/,v0/*class(_SVGElementImpl)*/,v1/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v3/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v4/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v5/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v6/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v7/*class(_NodeImpl)*/ = [v2/*class(_ElementImpl)*/,v3/*class(_DocumentFragmentImpl)*/,v4/*class(_DocumentImpl)*/,v5/*class(_CharacterDataImpl)*/,v2/*class(_ElementImpl)*/,v3/*class(_DocumentFragmentImpl)*/,v4/*class(_DocumentImpl)*/,v5/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v8/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v9/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest';
  var v10/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['WorkerContext', v6/*class(_WorkerContextImpl)*/],
    ['SVGElement', v0/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v1/*class(_MediaElementImpl)*/],
    ['Element', v2/*class(_ElementImpl)*/],
    ['DocumentFragment', v3/*class(_DocumentFragmentImpl)*/],
    ['HTMLDocument', v4/*class(_DocumentImpl)*/],
    ['CharacterData', v5/*class(_CharacterDataImpl)*/],
    ['Node', v7/*class(_NodeImpl)*/],
    ['MediaStream', v8/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v9/*class(_IDBRequestImpl)*/],
    ['AbstractWorker', v10/*class(_AbstractWorkerImpl)*/],
    ['EventTarget', [v6/*class(_WorkerContextImpl)*/,v7/*class(_NodeImpl)*/,v8/*class(_MediaStreamImpl)*/,v9/*class(_IDBRequestImpl)*/,v10/*class(_AbstractWorkerImpl)*/,v6/*class(_WorkerContextImpl)*/,v7/*class(_NodeImpl)*/,v8/*class(_MediaStreamImpl)*/,v9/*class(_IDBRequestImpl)*/,v10/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['MouseEvent', 'MouseEvent|WheelEvent|WheelEvent'],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.$call$0 = $.main
if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.startRootIsolate($.main);
  });
} else {
  $.startRootIsolate($.main);
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var collected in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, collected)) {
      var desc = collectedClasses[collected];
      Isolate.$defineClass(collected, desc.super, desc[''], desc);
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (prototype.__proto__) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
